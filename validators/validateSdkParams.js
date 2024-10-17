const Joi = require('joi');

const sdkParamsSchema = Joi.object({
    meetingNumber: Joi.number().required(),
    role:Joi.number().required(),
    expirationSeconds:Joi.number().required(),
});

module.exports = {
    sdkParamsSchema
};
