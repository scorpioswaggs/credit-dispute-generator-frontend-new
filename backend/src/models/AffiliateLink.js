const mongoose = require('mongoose');

const affiliateLinkSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  serviceUrl: {
    type: String,
    required: [true, 'Service URL is required'],
    trim: true
  },
  affiliateCode: {
    type: String,
    required: [true, 'Affiliate code is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
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

const AffiliateLink = mongoose.model('AffiliateLink', affiliateLinkSchema);

module.exports = AffiliateLink;
