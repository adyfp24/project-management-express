const profileService = require('../services/profile-service');
const fs = require('fs').promises;
const path = require('path');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileService.getProfile(userId);

        return res.status(200).json({
            "status": "success",
            "message": "Profil berhasil didapat",
            "data": profile
        });

    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const avatar = req.file ? req.file.filename : undefined;
        const { username, email, password, role } = req.body;

        const currentProfile = await profileService.getProfile(userId);

        const data = {
            username,
            email,
            password,
            role,
            avatar
        };

        const updatedProfile = await profileService.updateProfile(userId, data);

        if (avatar && currentProfile.avatar) {
            const oldAvatarPath = path.join(__dirname, '../storage/', currentProfile.avatar);
            await fs.unlink(oldAvatarPath).catch(err => console.error('Error deleting old avatar:', err));
        }

        return res.status(200).json({
            "status": "success",
            "message": "Profil berhasil diperbarui",
            "data": updatedProfile
        });

    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await profileService.deleteProfile(userId);

        if (!result) {
            return res.status(404).json({
                "status": "failed",
                "message": "Avatar tidak ditemukan atau tidak dapat dihapus"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Avatar berhasil dihapus"
        });

    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}