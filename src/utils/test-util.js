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

module.exports = {
    removeTestUser,
    createTestUser,
};
