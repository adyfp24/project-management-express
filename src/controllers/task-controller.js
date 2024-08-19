const taskService = require('../services/task-service');

const getAllTask = async (req, res) => {
    try {
        const taskList = await taskService.getAllTask();
        return res.status(200).json({
            "status": "success",
            "message": "Daftar tugas berhasil didapat",
            "data": taskList
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const getTaskById = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const task = await taskService.getTaskById(taskId);

        if (!task) {
            return res.status(404).json({
                "status": "failed",
                "message": "Tugas tidak ditemukan, id tidak sesuai"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Tugas berhasil didapat",
            "data": task
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, status, deadline, userId, projectId } = req.body
        const data = {
            title,
            description,
            status,
            deadline,
            userId,
            projectId
        }
        const newTask = await taskService.createTask(data);
        return res.status(201).json({
            "status": "success",
            "message": "Data tugas berhasil ditambahkan",
            "data": newTask
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const { title, description, status, userId, projectId, deadline } = req.body;

        const updatedTask = await taskService.updateTask(taskId, {
            title,
            description,
            status,
            userId,
            projectId,
            deadline: new Date(deadline)
        });

        if (!updatedTask) {
            return res.status(404).json({
                "status": "failed",
                "message": "Tugas tidak ditemukan"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Tugas berhasil diperbarui",
            "data": updatedTask
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);

        const deletedTask = await taskService.deleteTask(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                "status": "failed",
                "message": "Tugas tidak ditemukan"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Tugas berhasil dihapus"
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

module.exports = {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}