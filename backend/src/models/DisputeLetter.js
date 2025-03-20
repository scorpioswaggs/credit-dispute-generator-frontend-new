const mongoose = require('mongoose');

const disputeLetterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    fullName: {
      type: String,
      required: [true, 'Full name is required']
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street address is required']
      },
      city: {
        type: String,
        required: [true, 'City is required']
      },
      state: {
        type: String,
        required: [true, 'State is required']
      },
      zipCode: {
        type: String,
        required: [true, 'ZIP code is required']
      }
    },
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  creditorInfo: {
    name: {
      type: String,
      required: [true, 'Creditor name is required']
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required']
    }
  },
  disputeDetails: {
    category: {
      type: String,
      enum: ['latePayment', 'collection', 'personalInfo', 'account'],
      required: [true, 'Dispute category is required']
    },
    subCategory: {
      type: String,
      required: [true, 'Dispute sub-category is required']
    },
    reason: {
      type: String,
      required: [true, 'Dispute reason is required']
    },
    additionalDetails: {
      type: String
    }
  },
  letterFormat: {
    type: String,
    enum: ['metro2', 'legal'],
    required: [true, 'Letter format is required']
  },
  letterContent: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'generated', 'sent'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const DisputeLetter = mongoose.model('DisputeLetter', disputeLetterSchema);

module.exports = DisputeLetter;
