const prisma = require('../prismaClient');
const fs = require('fs');
const path = require('path');

const getProfile = async (userId) => {
    try {
        const profile = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        return profile;
    } catch (error) {
        throw new Error(error);
    }
}

const updateProfile = async (userId, updatedData) => {
    try {
        const newProfile = await prisma.user.update({
            where: {
                id: userId
            },
            data: updatedData
        });
        return newProfile;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProfile = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user || !user.avatar) {
            return false;
        }

        const avatarPath = path.join(__dirname, '../storage', user.avatar);
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatar: null
            }
        });

        return true;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}