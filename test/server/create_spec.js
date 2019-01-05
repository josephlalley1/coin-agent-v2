/* global describe, it, expect, api, beforeEach */

const User = require('../../models/user');

const Trade = require('../../models/trade');

const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3'
];

const tradeData = [
  {
    coinName: 'Litecoin',
    symbol: 'LTC',
    transactionTotal: 6.1234,
    transactionAddedBy: userIds[1]
  }
];

describe('Events CREATE', () => {

  beforeEach(done => {
    Trade.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        email: 'test',
        username: 'test',
        password: 'test'
      }));
    done();
  });
});

it('should return a 201 response', done => {
  api.post('/api/trades')
    .send(tradeData)
    .end((err, res) => {
      expect(res.status).to.eq(201);
      done();
    });
});

it('should return an object', done => {
  api.post('/api/trades')
    .send(tradeData)
    .end((err, res) => {
      expect(res).to.be.an('object');
      done();
    });
});

it('should return the correct data', done => {
  api.post('/api/trades')
    .send(tradeData)
    .end((err, res) => {
      expect(res.body.coinName).to.eq(tradeData.coinName);
      expect(res.body.symbol).to.eq(tradeData.symbol);
      expect(res.body.transactionTotal).to.eq(tradeData.transactionTotal);
      done();
    });
});
