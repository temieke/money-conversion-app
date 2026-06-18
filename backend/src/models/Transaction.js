const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['conversion', 'transfer', 'refund'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  exchangeRate: {
    type: Number,
    default: 1,
  },
  convertedAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending',
  },
  bankAccountId: {
    type: String,
    required: true,
  },
  description: String,
  fee: {
    type: Number,
    default: 0,
  },
  transactionHash: String,
  stripeTransactionId: String,
  errorMessage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
