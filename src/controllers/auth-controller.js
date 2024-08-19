const authService = require('../services/auth-service');

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const loggedInUser = await authService.loginUser(username, password);

        if (!loggedInUser.success) {
            return res.status(400).json({
                "status": "failed",
                "message": loggedInUser.message
            });
        }
        return res.status(200).json({
            "status": "success",
            "message": "login berhasil",
            "data": loggedInUser.data
        })
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, password, email, role, avatar } = req.body;

        const data = {
            username,
            password,
            email,
            role,
            avatar
        };

        const newUser = await authService.registerUser(data);

        if (!newUser.success) {
            return res.status(400).json({
                "status": "failed",
                "message": newUser.message
            });
        }
        return res.status(201).json({
            "status": "success",
            "message": "registrasi berhasil",
            "data": newUser.data
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const logoutUser = (req, res) => {
    try {
        return res.status(200).json({
            "status": "success",
            "message": "tes logout",
        })
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const refreshToken = async () => {
    try {

    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken
}