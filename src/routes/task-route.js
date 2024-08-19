const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');
const { verifyToken } = require('../middlewares/verify-token');

router.get('/tugas', verifyToken, taskController.getAllTask);
router.get('/tugas/:id', verifyToken, taskController.getTaskById);
router.post('/tugas', verifyToken, taskController.createTask);
router.put('/tugas/:id', verifyToken, taskController.updateTask);
router.delete('/tugas/:id', verifyToken, taskController.deleteTask);

module.exports = router;