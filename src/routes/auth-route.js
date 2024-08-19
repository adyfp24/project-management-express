const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { verifyToken } = require('../middlewares/verify-token');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', verifyToken, authController.logoutUser);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;