const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const DisputeLetter = require('../src/models/DisputeLetter');
const letterGenerator = require('../src/utils/letterGenerator');

describe('Letter Generator Tests', function() {
  before(async function() {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/credisure_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Clear test database
    await User.deleteMany({});
    await DisputeLetter.deleteMany({});
  });

  after(async function() {
    // Disconnect from test database
    await mongoose.connection.close();
  });

  it('should generate a Metro 2 compliant letter', function() {
    const letterData = {
      personalInfo: {
        fullName: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        },
        phone: '555-123-4567',
        email: 'john@example.com'
      },
      creditorInfo: {
        name: 'ABC Bank',
        address: {
          street: '456 Finance Ave',
          city: 'Moneytown',
          state: 'NY',
          zipCode: '67890'
        },
        accountNumber: '1234567890'
      },
      disputeDetails: {
        category: 'latePayment',
        subCategory: 'goodwill',
        reason: 'Payment was only 3 days late due to postal delay',
        additionalDetails: 'I have been a customer in good standing for 5 years'
      },
      letterFormat: 'metro2'
    };

    const templateContent = `{{HEADER}}
To Whom It May Concern:
I am writing to dispute information that appears on my credit report.
Dispute Category: {{DISPUTE_CATEGORY}}
Specific Issue: {{DISPUTE_SUBCATEGORY}}
Reason: {{DISPUTE_REASON}}
{{#if ADDITIONAL_DETAILS}}
Additional information: {{ADDITIONAL_DETAILS}}
{{/if}}
{{SIGNATURE}}`;

    const letterContent = letterGenerator.generateLetterContent(letterData, templateContent);
    
    expect(letterContent).to.include('John Doe');
    expect(letterContent).to.include('123 Main St');
    expect(letterContent).to.include('ABC Bank');
    expect(letterContent).to.include('1234567890');
    expect(letterContent).to.include('Late Payment');
    expect(letterContent).to.include('Goodwill Adjustment');
    expect(letterContent).to.include('Payment was only 3 days late due to postal delay');
    expect(letterContent).to.include('I have been a customer in good standing for 5 years');
  });

  it('should generate a legal-based letter', function() {
    const letterData = {
      personalInfo: {
        fullName: 'Jane Smith',
        address: {
          street: '789 Oak Dr',
          city: 'Somewhere',
          state: 'TX',
          zipCode: '54321'
        },
        phone: '555-987-6543',
        email: 'jane@example.com'
      },
      creditorInfo: {
        name: 'XYZ Collections',
        address: {
          street: '321 Collector Rd',
          city: 'Debtville',
          state: 'FL',
          zipCode: '13579'
        },
        accountNumber: '9876543210'
      },
      disputeDetails: {
        category: 'collection',
        subCategory: 'debtValidation',
        reason: 'This debt is not mine and I have never had an account with this company',
        additionalDetails: ''
      },
      letterFormat: 'legal'
    };

    const templateContent = `{{HEADER}}
To Whom It May Concern:
I am writing to dispute information in accordance with the FCRA, FDCPA, and FTC regulations.
Dispute Category: {{DISPUTE_CATEGORY}}
Specific Issue: {{DISPUTE_SUBCATEGORY}}
Reason: {{DISPUTE_REASON}}
{{#if ADDITIONAL_DETAILS}}
Additional information: {{ADDITIONAL_DETAILS}}
{{/if}}
{{SIGNATURE}}`;

    const letterContent = letterGenerator.generateLetterContent(letterData, templateContent);
    
    expect(letterContent).to.include('Jane Smith');
    expect(letterContent).to.include('789 Oak Dr');
    expect(letterContent).to.include('XYZ Collections');
    expect(letterContent).to.include('9876543210');
    expect(letterContent).to.include('Collection');
    expect(letterContent).to.include('Debt Validation');
    expect(letterContent).to.include('This debt is not mine and I have never had an account with this company');
    expect(letterContent).to.not.include('Additional information:');
  });
});
