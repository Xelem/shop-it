const express = require('express');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', viewController.getOverview);

module.exports = router;
