const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'failed',
                message: 'Token tidak terdeteksi'
            });
        }

        const accessToken = jwt.verify(token, process.env.ACCESS_KEY);

        if (!accessToken) {
            return res.status(401).json({
                status: 'failed',
                message: 'Unauthorized'
            });
        }
        
        req.user = accessToken; 
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            "status": "failed",
            "message": "Internal Server Error: " + error.message
        });
    }
};

module.exports = {
    verifyToken
}