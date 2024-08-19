const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        name: Joi.string().required().max(100),
        description: Joi.string().optional(),
    })
}

const update = {
    body: Joi.object().keys({
        name: Joi.string().optional().max(100),
        description: Joi.string().optional(),
    })
}

module.exports = {
    create,
    update
}