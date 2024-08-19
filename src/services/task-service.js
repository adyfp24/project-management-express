const prisma = require('../prismaClient');

const getAllTask = async () => {
    try {
        const allTask = await prisma.task.findMany({
            include: {
                user: true,
                project: true
            }
        });
        return allTask;
    } catch (error) {
        throw new Error(error);
    }
}

const getTaskById = async (taskId) => {
    try {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId
            },
            include: {
                user: true,
                project: true
            }
        });
        return task;
    } catch (error) {
        throw new Error(error);
    }
}

const createTask = async (taskData) => {
    try {
        const newTask = await prisma.task.create({
            data: taskData,
        });
        return newTask;
    } catch (error) {
        throw new Error(error);
    }
}


const updateTask = async (taskId, taskData) => {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: taskData
        });
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteTask = async (taskId) => {
    try {
        const deletedTask = await prisma.task.delete({
            where: { id: taskId }
        });
        return deletedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}