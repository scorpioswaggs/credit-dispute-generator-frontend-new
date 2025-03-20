const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('Auth API Tests', function() {
  let testUser;
  let token;

  before(async function() {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/credisure_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Clear test database
    await User.deleteMany({});
    
    // Create test user
    testUser = await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345'
      },
      phone: '555-123-4567'
    });
    
    // Generate token for test user
    token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET || 'testsecret', {
      expiresIn: '30d'
    });
  });

  after(async function() {
    // Disconnect from test database
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', function() {
    it('should register a new user', function(done) {
      request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          firstName: 'New',
          lastName: 'User',
          address: {
            street: '456 New St',
            city: 'New City',
            state: 'NS',
            zipCode: '67890'
          },
          phone: '555-987-6543'
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.token).to.exist;
          expect(res.body.user).to.exist;
          expect(res.body.user.email).to.equal('newuser@example.com');
          done();
        });
    });

    it('should not register a user with existing email', function(done) {
      request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Duplicate',
          lastName: 'User',
          address: {
            street: '789 Dup St',
            city: 'Dup City',
            state: 'DS',
            zipCode: '13579'
          },
          phone: '555-246-8101'
        })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('User already exists');
          done();
        });
    });
  });

  describe('POST /api/auth/login', function() {
    it('should login with correct credentials', function(done) {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.token).to.exist;
          expect(res.body.user).to.exist;
          expect(res.body.user.email).to.equal('test@example.com');
          done();
        });
    });

    it('should not login with incorrect password', function(done) {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('Invalid credentials');
          done();
        });
    });
  });

  describe('GET /api/auth/me', function() {
    it('should get current user profile', function(done) {
      request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.user).to.exist;
          expect(res.body.user.email).to.equal('test@example.com');
          expect(res.body.user.firstName).to.equal('Test');
          expect(res.body.user.lastName).to.equal('User');
          done();
        });
    });

    it('should not access profile without token', function(done) {
      request(app)
        .get('/api/auth/me')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('Not authorized');
          done();
        });
    });
  });
});
