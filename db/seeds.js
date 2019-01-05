const mongoose = require('mongoose');
const environment = require('../config/environment');
mongoose.connect(environment.dbURI);
const Trades = require('../models/trade');
const User = require('../models/user');

const userIds = [
  '5be9ab34206c80cc7c53dd09',
  '5be9ab35206c80cc7c53dd0a',
  '5be9ab36206c80cc7c53dd0b'
];

const userData = [
  {
    _id: userIds[0],
    username: 'Joseph',
    email: 'j@j',
    password: 'pass'
  }, {
    _id: userIds[1],
    username: 'Rafa',
    email: 'r@r',
    password: 'pass'
  }
];


const addedTrades = [
  {
    coinName: 'Bitcoin',
    symbol: 'BTC',
    transactionTotal: 1.234,
    transactionAddedBy: userIds[1]
  },
  {
    coinName: 'Ethereum',
    symbol: 'ETH',
    transactionTotal: 5.678,
    transactionAddedBy: userIds[1]
  },
  {
    coinName: 'Ripple',
    symbol: 'XRP',
    transactionTotal: 9.123,
    transactionAddedBy: userIds[0]
  }
];

Trades.collection.drop();
User.collection.drop();

Trades.create(addedTrades)
  .then(trades => {
    console.log(`Created ${trades.length} trades`);
    User.create(userData)
      .then(users => {
        console.log(`Created ${users.length} users`);
        mongoose.connection.close();
      });
  });
