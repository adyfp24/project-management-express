const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile-controller');
const { verifyToken } = require('../middlewares/verify-token');

router.get('/profile', verifyToken, profileController.getProfile);
router.put('/profile', verifyToken, profileController.updateProfile);

module.exports = router;