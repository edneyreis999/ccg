import * as Joi from "joi";

export const verifyCardModelAttributes = Joi.object().keys({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    class: Joi.number().required(),
    version: Joi.number().required(),
    rules: Joi.object().required(),
    faction: Joi.number().required(),
    assetName: Joi.string().required(),
    assetNumber: Joi.number().required(),
    ruleDescription: Joi.number().required(),
});

