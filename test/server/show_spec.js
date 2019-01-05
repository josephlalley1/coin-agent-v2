/* global api, expect, describe, it, beforeEach */

const Trade = require('../../models/trade');
const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3'
];
const tradeData = [
  {
    coinName: 'testcoin1',
    symbol: 'test1',
    transactionTotal: 123,
    transactionAddedBy: userIds[1]
  },
  {
    coinName: 'testcoin2',
    symbol: 'test2',
    transactionTotal: 456,
    transactionAddedBy: userIds[1]
  },
  {
    coinName: 'testcoin3',
    symbol: 'test3',
    transactionTotal: 789,
    transactionAddedBy: userIds[1]
  }
];

let tradeId;

describe('Trades SHOW', () => {

  beforeEach(done => {
    Trade.remove({})
      .then(() => Trade.create(tradeData))
      .then(trade => {
        tradeId = trade[0]._id;
        console.log(tradeId);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/trades/${tradeId}`)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/trades/${tradeId}`)
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/trades/${tradeId}`)
      .end((err, res) => {
        expect(res.body.coinName).to.eq(tradeData[0].coinName);
        expect(res.body.symbol).to.eq(tradeData[0].symbol);
        expect(res.body.transactionTotal).to.eq(tradeData[0].transactionTotal);
        done();
      });
  });
});
