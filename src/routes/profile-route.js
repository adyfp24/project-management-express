const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile-controller');
const { verifyToken } = require('../middlewares/verify-token');
const { upload } = require('../middlewares/multer');
const { validate } = require('../middlewares/validator');
const profileValidation = require('../validations/profile-validation');

router.get('/profile', verifyToken, profileController.getProfile);
router.put('/profile', verifyToken, validate(profileValidation.update), upload.single('file'), profileController.updateProfile);
router.delete('/profile', verifyToken, profileController.deleteProfile);

module.exports = router;