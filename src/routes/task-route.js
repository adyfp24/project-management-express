const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');
const { verifyToken } = require('../middlewares/verify-token');
const { validate } = require('../middlewares/validator');
const taskValidation = require('../validations/task-validation');

router.get('/tugas', verifyToken, taskController.getAllTask);
router.get('/tugas/:id', verifyToken, taskController.getTaskById);
router.post('/tugas', verifyToken, validate(taskValidation.create), taskController.createTask);
router.put('/tugas/:id', verifyToken, validate(taskValidation.update), taskController.updateTask);
router.delete('/tugas/:id', verifyToken, taskController.deleteTask);

module.exports = router;