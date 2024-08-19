const express = require('express');
const router = express.Router();
const proyekController = require('../controllers/proyek-controller');

router.get('/proyek', proyekController.getAllProyek);
router.get('/proyek/:id', proyekController.getProyekById);
router.post('/proyek', proyekController.createProyek);
router.put('/proyek/:id', proyekController.updateProyek);
router.delete('/proyek/:id', proyekController.deleteProyek);

module.exports = router;