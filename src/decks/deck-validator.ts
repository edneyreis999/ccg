import * as Joi from "joi";

export const verifyDeckModelAttributes = Joi.object().keys({
    userId: Joi.string().required(),
    rules: Joi.object().required(),
    name: Joi.string().required(),
    type: Joi.number().required(),
});

