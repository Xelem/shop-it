const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();
router.use(authController.protect);

router.post(
  '/create-catalog',
  authController.restrictTo('seller'),
  productController.createCatalog
);
router.get(
  '/orders',
  authController.restrictTo('seller'),
  productController.getOrders
);

router.use(authController.restrictTo('buyer'));

router.get('/seller-catalog/:seller_id', productController.getCatalog);
router.get('/list-of-sellers', userController.getAllSellers);
router.post('/create-order/:seller_id', productController.createOrder);

module.exports = router;
