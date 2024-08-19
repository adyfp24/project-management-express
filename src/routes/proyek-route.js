const express = require('express');
const router = express.Router();
const proyekController = require('../controllers/proyek-controller');
const { verifyToken } = require('../middlewares/verify-token');

router.get('/proyek', verifyToken, proyekController.getAllProyek);
router.get('/proyek/:id', verifyToken, proyekController.getProyekById);
router.post('/proyek', verifyToken, proyekController.createProyek);
router.put('/proyek/:id', verifyToken, proyekController.updateProyek);
router.delete('/proyek/:id', verifyToken, proyekController.deleteProyek);

module.exports = router;