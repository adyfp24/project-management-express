const jwt = require('jsonwebtoken');

const generateJWTAccess = (idUser) => {
    const apiToken = jwt.sign({id : idUser}, process.env.ACCESS_KEY, {expiresIn : '30m'})
    return apiToken;
}

module.exports = {
    generateJWTAccess
}