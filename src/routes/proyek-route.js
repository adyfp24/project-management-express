const express = require('express');
const router = express.Router();
const proyekController = require('../controllers/proyek-controller');
const { verifyToken } = require('../middlewares/verify-token');
const { validate } = require('../middlewares/validator');
const proyekValidation = require('../validations/proyek-validation');

router.get('/proyek', verifyToken, proyekController.getAllProyek);
router.get('/proyek/:id', verifyToken, proyekController.getProyekById);
router.post('/proyek', verifyToken, validate(proyekValidation.create), proyekController.createProyek);
router.put('/proyek/:id', verifyToken, validate(proyekValidation.update), proyekController.updateProyek);
router.delete('/proyek/:id', verifyToken, proyekController.deleteProyek);

module.exports = router;