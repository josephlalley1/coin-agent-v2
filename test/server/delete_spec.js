/* global api, expect, describe, it, beforeEach */
const Trade = require('../../models/trade');
const User = require('../../models/user');

let tradeId;

const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3'
];

const userData = [
  {
    _id: userIds[0],
    username: 'test',
    email: 'test',
    password: 'test'
  }
];

const tradeData = [
  {
    coinName: 'test',
    symbol: 'test',
    transactionTotal: 1234,
    transactionAddedBy: userIds[1]
  }
];

describe('Events DELETE', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => Trade.create(tradeData))
      .then(trade => {
        tradeId = trade[0]._id;
        done();
      });
  });

  it('should delete the trade', done => {
    api.delete(`/api/trades/${tradeId}`)
      .then(() => Trade.find())
      .then(trades => {
        expect(trades.length).to.eq(0);
      });
    done();
  });
});
