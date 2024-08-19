const Joi = require('joi');

const update = {
    body: Joi.object().keys({
        username: Joi.string().optional().max(20),
        password: Joi.string().optional(),
        email: Joi.string().optional().email(),
        role: Joi.string().optional(),
    })
}

module.exports = {
    update
}