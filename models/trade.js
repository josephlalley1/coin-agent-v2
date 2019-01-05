const mongoose = require('mongoose');

// Symbol === coin initials
const tradesSchema = mongoose.Schema({
  coinName: String,
  symbol: String,
  transactionTotal: Number,
  transactionAddedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const tradesModel = mongoose.model('Trades', tradesSchema);

module.exports = tradesModel;
