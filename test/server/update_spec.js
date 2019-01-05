/* global api, expect, describe, it, beforeEach */
const Event = require('../../models/trade');
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
    coinName: 'testcoin3',
    symbol: 'test3',
    transactionTotal: 789,
    transactionAddedBy: userIds[1]
  }
];

const updateData = [
  {
    coinName: 'updatedtestcoin3',
    symbol: 'updatedtest3',
    transactionTotal: 1,
    transactionAddedBy: userIds[1]
  }
];

describe('Events UPDATE', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => Event.create(tradeData))
      .then(trade => {
        tradeId = trade[0]._id;
        done();
      });
  });

  it('should return a 200', done => {
    api.put(`/api/trades/${tradeId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
      });
    done();
  });

  it('should return an object', done => {
    api.put(`/api/trades/${tradeId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

});
