const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { upload } = require('../middlewares/multer');
const { validate } = require('../middlewares/validator');
const authValidation = require('../validations/auth-validation');

router.post('/register', validate(authValidation.regist), upload.single('file'), authController.registerUser);
router.post('/login', validate(authValidation.login), authController.loginUser);

module.exports = router;