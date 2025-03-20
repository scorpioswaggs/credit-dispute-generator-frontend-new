const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const DisputeLetter = require('../src/models/DisputeLetter');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('Letter API Tests', function() {
  let testUser;
  let token;
  let testLetter;

  before(async function() {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/credisure_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Clear test database
    await User.deleteMany({});
    await DisputeLetter.deleteMany({});
    
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
    
    // Create test letter
    testLetter = await DisputeLetter.create({
      userId: testUser._id,
      personalInfo: {
        fullName: 'Test User',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345'
        },
        phone: '555-123-4567',
        email: 'test@example.com'
      },
      creditorInfo: {
        name: 'Test Bank',
        address: {
          street: '456 Bank St',
          city: 'Bank City',
          state: 'BC',
          zipCode: '67890'
        },
        accountNumber: '1234567890'
      },
      disputeDetails: {
        category: 'latePayment',
        subCategory: 'goodwill',
        reason: 'Test reason',
        additionalDetails: 'Test details'
      },
      letterFormat: 'metro2',
      status: 'draft'
    });
  });

  after(async function() {
    // Disconnect from test database
    await mongoose.connection.close();
  });

  describe('GET /api/letters', function() {
    it('should get all letters for current user', function(done) {
      request(app)
        .get('/api/letters')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(1);
          expect(res.body.data[0].creditorInfo.name).to.equal('Test Bank');
          done();
        });
    });

    it('should not access letters without token', function(done) {
      request(app)
        .get('/api/letters')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('Not authorized');
          done();
        });
    });
  });

  describe('GET /api/letters/:id', function() {
    it('should get a specific letter', function(done) {
      request(app)
        .get(`/api/letters/${testLetter._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.exist;
          expect(res.body.data.creditorInfo.name).to.equal('Test Bank');
          expect(res.body.data.disputeDetails.category).to.equal('latePayment');
          done();
        });
    });

    it('should not get a non-existent letter', function(done) {
      request(app)
        .get(`/api/letters/60f1a5c5f5b5f5b5f5b5f5b5`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('not found');
          done();
        });
    });
  });

  describe('POST /api/letters', function() {
    it('should create a new letter', function(done) {
      request(app)
        .post('/api/letters')
        .set('Authorization', `Bearer ${token}`)
        .send({
          personalInfo: {
            fullName: 'New Test User',
            address: {
              street: '789 New St',
              city: 'New City',
              state: 'NS',
              zipCode: '54321'
            },
            phone: '555-987-6543',
            email: 'newtest@example.com'
          },
          creditorInfo: {
            name: 'New Bank',
            address: {
              street: '321 New Bank St',
              city: 'New Bank City',
              state: 'NB',
              zipCode: '09876'
            },
            accountNumber: '0987654321'
          },
          disputeDetails: {
            category: 'collection',
            subCategory: 'debtValidation',
            reason: 'New test reason',
            additionalDetails: 'New test details'
          },
          letterFormat: 'metro2',
          status: 'draft'
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.exist;
          expect(res.body.data.creditorInfo.name).to.equal('New Bank');
          expect(res.body.data.disputeDetails.category).to.equal('collection');
          done();
        });
    });
  });

  describe('PUT /api/letters/:id', function() {
    it('should update a letter', function(done) {
      request(app)
        .put(`/api/letters/${testLetter._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          creditorInfo: {
            name: 'Updated Bank',
            address: {
              street: '456 Bank St',
              city: 'Bank City',
              state: 'BC',
              zipCode: '67890'
            },
            accountNumber: '1234567890'
          }
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.exist;
          expect(res.body.data.creditorInfo.name).to.equal('Updated Bank');
          done();
        });
    });
  });
});
