const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router
  .route('/create-catalog')
  .post(authController.restrictTo('seller'), productController.createCatalog);

module.exports = router;
