const router = require('express').Router();
const trades = require('../controllers/tradesController');
const authController = require('../controllers/authController');

router.route('/trades')
  .get(trades.index)
  .post(trades.create);

router.route('/trades/:id')
  .get(trades.show)
  .put(trades.update)
  .delete(trades.delete);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
