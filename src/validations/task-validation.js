const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        title: Joi.string().required().max(100),
        description: Joi.string().optional(),
        status: Joi.string().optional(),
        userId: Joi.number().required(),
        projectId: Joi.number().required(),
        deadline: Joi.date().required()
    })
}

const update = {
    body: Joi.object().keys({
        title: Joi.string().optional().max(100),
        description: Joi.string().optional(),
        status: Joi.string().optional(),
        userId: Joi.number().optional(),
        projectId: Joi.number().optional(),
        deadline: Joi.date().optional()
    })
}

module.exports = {
    create,
    update
}

