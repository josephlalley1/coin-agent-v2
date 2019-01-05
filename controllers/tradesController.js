const Trade = require('../models/trade');

function indexRoute(req, res) {
  Trade
    .find()
    .then(trades => {
      res.json(trades);
    });
}

function showRoute(req,res) {
  Trade
    .findById(req.params.id)
    .then(trade => {
      res.json(trade);
    });
}

function createRoute(req, res, next) {
  Trade
    .create(req.body)
    .then(trade => res.status(201).json(trade))
    .catch(next);
}

function updateRoute(req, res, next) {
  Trade.findById(req.params.id)
    .then(trade => trade.set(req.body))
    .then(trade => trade.save())
    .then(trade => res.json(trade))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Trade.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
