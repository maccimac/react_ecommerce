const express = require('express');
const router = express.Router();
const { requireSignIn, isAuth, isAdmin }  =  require('../controllers/auth');
const { userById, addOrderToUserHistory  }  = require('../controllers/user');
const { create, listOrders } = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/product');

router.post(
  '/order/create/:userId',
  requireSignIn,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create)

router.param('userId', userById)
router.get('/order/list/:userId', requireSignIn, isAuth, isAdmin, listOrders)

module.exports = router;
