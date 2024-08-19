const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const utilsToken = require('../utils/sign-token');

const loginUser = async (username, password) => {
    try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return { success: false, message: 'Username tidak terdaftar' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const accessToken = utilsToken.generateJWTAccess(user.id);
            return {
                success: true,
                data: { user, access_token: accessToken },
            };
        } else {
            return { success: false, message: 'Password salah' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error : ' + error);
    }
}

const registerUser = async (userData) => {
    try {
        const isUsernameExist = await prisma.user.findUnique({ where: { username: userData.username } });
        if (isUsernameExist) {
            return { succes: false, message: "username telah digunakan" }
        }

        const validRoles = ['frontend', 'backend', 'designer', 'analyst', 'pm'];
        if (userData.role && !validRoles.includes(userData.role)) {
            return { succes: false, message: "role tidak valid" }
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        });
        return {
            success: true,
            data: newUser,
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const logoutUser = async () => {

}

const refreshToken = async () => {

}

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken
}