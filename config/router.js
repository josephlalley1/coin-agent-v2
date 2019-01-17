const router = require('express').Router();
const trades = require('../controllers/tradesController');
const dashboard = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

router.route('/trades')
  .get(trades.index)
  .post(trades.create);

router.route('/trades/:id')
  .get(trades.show)
  .put(trades.update)
  .delete(trades.delete);

router.route('/dashboard')
  .get(dashboard.total)
  .get(trades.dash);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
