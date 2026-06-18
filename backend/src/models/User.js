const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v <= 17;
      },
      message: 'User must be 17 years or younger',
    },
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  subscription: {
    status: {
      type: String,
      enum: ['active', 'trial', 'cancelled', 'expired'],
      default: 'trial',
    },
    trialStartDate: {
      type: Date,
      default: Date.now,
    },
    trialEndDate: {
      type: Date,
      default: function() {
        const date = new Date();
        date.setMonth(date.getMonth() + 2); // 2 months trial
        return date;
      },
    },
    paidSubscriptionStartDate: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    monthlyFee: {
      type: Number,
      default: 9.99, // Example fee
    },
  },
  bankAccount: {
    plaidAccessToken: String,
    accountId: String,
    accountName: String,
    bankName: String,
    last4: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
