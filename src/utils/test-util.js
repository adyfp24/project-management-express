const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const removeTestUser = async () => {
    try {
        await prisma.user.deleteMany({
            where: {
                username: "testuser"
            }
        });
    } catch (error) {
        console.error('Error removing test user:', error);
    }
};

const createTestUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash("password123", 10);
        await prisma.user.create({
            data: {
                username: "testuser",
                email: "testuser@example.com",
                password: hashedPassword,
                role: "frontend" 
            }
        });
    } catch (error) {
        console.error('Error creating test user:', error);
    }
};

const createTestProject = async () => {
    await prisma.project.create({
        data: {
            name: 'Test Project',
            description: 'Test project description'
        }
    });
};

const removeTestProjects = async () => {
    await prisma.project.deleteMany({
        where: {
            name: 'Test Project'
        }
    });
};

module.exports = {
    removeTestUser,
    createTestUser,
    createTestProject,
    removeTestProjects
};
