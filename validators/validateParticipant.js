const Joi = require('joi');

const sportlightSchema = Joi.object({
    meetingNumber: Joi.number().required(),
    meetingPassword:Joi.string().required(),
    userId:Joi.string().required(),
});

module.exports = {
    sportlightSchema
};
