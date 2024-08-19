const prisma = require('../prismaClient');

const getAllProyek = async () => {
    try {
        const proyekList = await prisma.project.findMany({
            include: {
                tasks: true
            }
        });
        return proyekList;
    } catch (error) {
        throw new Error('Error retrieving project list: ' + error.message);
    }
};

const getProyekById = async (proyekId) => {
    try {
        const proyek = await prisma.project.findUnique({
            where: { id: proyekId },
            include: {
                tasks: true
            }
        });
        return proyek;
    } catch (error) {
        throw new Error('Error retrieving project by ID: ' + error.message);
    }
};

const createProyek = async (data) => {
    try {
        const newProyek = await prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
            }
        });
        return newProyek;
    } catch (error) {
        throw new Error('Error creating project: ' + error.message);
    }
};

const updateProyek = async (proyekId, data) => {
    try {
        const updatedProyek = await prisma.project.update({
            where: { id: proyekId },
            data: {
                name: data.name,
                description: data.description,
            }
        });
        return updatedProyek;
    } catch (error) {
        throw new Error('Error updating project: ' + error.message);
    }
};

const deleteProyek = async (proyekId) => {
    try {
        const deletedProyek = await prisma.project.delete({
            where: { id: proyekId },
        });
        return deletedProyek;
    } catch (error) {
        throw new Error('Error deleting project: ' + error.message);
    }
};

module.exports = {
    getAllProyek,
    getProyekById,
    createProyek,
    updateProyek,
    deleteProyek
};
