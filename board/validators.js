const Joi = require('joi');

const create = {
    body: {
        board:
        {
            name: Joi.string()
                .required(),
            color: Joi.string()
                .required(),
            description: Joi.string()
                .required()
        }
    }
};

const update = {
    body: {
        board:
        {
            id: Joi.number()
                .required(),
            created: Joi.date()
                .required(),
            name: Joi.string()
                .required(),
            color: Joi.string()
                .required(),
            description: Joi.string()
                .required()
        }
    }
};

module.exports = {
    create,
    update
};
