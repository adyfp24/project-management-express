const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        username: Joi.string().required().max(20),
        password: Joi.string().required(),
    })
};

const regist = {
    body: Joi.object().keys({
        username: Joi.string().required().max(20),
        password: Joi.string().required(),
        email: Joi.string().required().email(),
        role: Joi.string().required(),
    })
}

module.exports = {
    login,
    regist
}