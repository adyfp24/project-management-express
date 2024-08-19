const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');
const { verifyToken } = require('../middlewares/verify-token');

router.get('/task', verifyToken, taskController.getAllTask);
router.get('/task/:id', verifyToken, taskController.getTaskById);
router.post('/task', verifyToken, taskController.createTask);
router.put('/task/:id', verifyToken, taskController.updateTask);
router.delete('/task/:id', verifyToken, taskController.deleteTask);

module.exports = router;