const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required']
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['subscription', 'oneTimePurchase'],
    required: [true, 'Transaction type is required']
  },
  productId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
