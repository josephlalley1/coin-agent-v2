/* global describe, it, expect, api, beforeEach */

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

describe('Events INDEX', () => {

  beforeEach(done => {
    Trade.remove({})
      .then(() => Trade.create(tradeData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/trades')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/trades')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/trades')
      .end((err, res) => {
        res.body.forEach(item => expect(item).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/trades')
      .end((err, res) => {
        res.body.forEach(trade => {
          const dataItem = tradeData.find(item => item.coinName === trade.coinName);
          expect(res.body.coinName).to.eq(dataItem.coinName);
          expect(res.body.symbol).to.eq(dataItem.symbol);
          expect(res.body.transactionTotal).to.eq(dataItem.transactionTotal);
        });
        done();
      });
  });

});
