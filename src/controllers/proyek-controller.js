const proyekService = require('../services/proyek-service');

const getAllProyek = async (req, res) => {
    try {
        const proyekList = await proyekService.getAllProyek();
        return res.status(200).json({
            "status": "success",
            "message": "Daftar proyek berhasil ditemukan",
            "data": proyekList
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

const getProyekById = async (req, res) => {
    try {
        const proyekId = parseInt(req.params.id, 10);
        const proyek = await proyekService.getProyekById(proyekId);

        if (!proyek) {
            return res.status(404).json({
                "status": "failed",
                "message": "Proyek tidak ditemukan"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Proyek berhasil ditemukan",
            "data": proyek
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

const createProyek = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newProyek = await proyekService.createProyek({ name, description });

        return res.status(201).json({
            "status": "success",
            "message": "Proyek berhasil dibuat",
            "data": newProyek
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

const updateProyek = async (req, res) => {
    try {
        const proyekId = parseInt(req.params.id, 10);
        const { name, description } = req.body;

        const updatedProyek = await proyekService.updateProyek(proyekId, { name, description });

        if (!updatedProyek) {
            return res.status(404).json({
                "status": "failed",
                "message": "Proyek tidak ditemukan"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Proyek berhasil diperbarui",
            "data": updatedProyek
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

const deleteProyek = async (req, res) => {
    try {
        const proyekId = parseInt(req.params.id, 10);

        const deletedProyek = await proyekService.deleteProyek(proyekId);

        if (!deletedProyek) {
            return res.status(404).json({
                "status": "failed",
                "message": "Proyek tidak ditemukan"
            });
        }

        return res.status(200).json({
            "status": "success",
            "message": "Proyek berhasil dihapus",
            "data": deletedProyek
        });
    } catch (error) {
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

module.exports = {
    getAllProyek,
    getProyekById,
    createProyek,
    updateProyek,
    deleteProyek
};
