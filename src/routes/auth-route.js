const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { verifyToken } = require('../middlewares/verify-token');
const { upload } = require('../middlewares/multer');

router.post('/register', upload.single('file'), authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', verifyToken, authController.logoutUser);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;