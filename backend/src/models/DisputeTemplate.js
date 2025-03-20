const mongoose = require('mongoose');

const disputeTemplateSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['latePayment', 'collection', 'personalInfo', 'account'],
    required: [true, 'Dispute category is required']
  },
  subCategory: {
    type: String,
    required: [true, 'Dispute sub-category is required']
  },
  format: {
    type: String,
    enum: ['metro2', 'legal'],
    required: [true, 'Template format is required']
  },
  templateTitle: {
    type: String,
    required: [true, 'Template title is required']
  },
  templateContent: {
    type: String,
    required: [true, 'Template content is required']
  },
  isPremium: {
    type: Boolean,
    default: false
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

const DisputeTemplate = mongoose.model('DisputeTemplate', disputeTemplateSchema);

module.exports = DisputeTemplate;
