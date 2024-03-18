import Joi from "joi";

import detectBad from "../../../utils/modifyText/detectBad.js"; 
import { getErrorMessages, message } from "../../../utils/getMessageError.js";
 
export const schema = {
    body: Joi.object({ 
         multiLanguages: Joi.object({ 
			ar: {
                projectName: Joi.string()
                .trim()
                .min(3)
                .max(250)
                .required()
                .messages(getErrorMessages("projectName"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            description: Joi.string()
                .trim()
                .min(3)
                .max(500)
                .required()
                .messages(getErrorMessages("description"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            city: Joi.string()
                .trim()
                .min(3)
                .max(100)
                .required()
                .messages(getErrorMessages("city"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            area: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .required()
                .messages(getErrorMessages("area"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
			},
			en: {
                projectName: Joi.string()
                .trim()
                .min(3)
                .max(250)
                .required()
                .messages(getErrorMessages("projectName"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            description: Joi.string()
                .trim()
                .min(3)
                .max(500)
                .required()
                .messages(getErrorMessages("description"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            city: Joi.string()
                .trim()
                .min(3)
                .max(100)
                .required()
                .messages(getErrorMessages("city"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            area: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .required()
                .messages(getErrorMessages("area"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
			},
			tr: {
                projectName: Joi.string()
                .trim()
                .min(3)
                .max(250)
                .required()
                .messages(getErrorMessages("projectName"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            description: Joi.string()
                .trim()
                .min(3)
                .max(500)
                .required()
                .messages(getErrorMessages("description"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            city: Joi.string()
                .trim()
                .min(3)
                .max(100)
                .required()
                .messages(getErrorMessages("city"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
            area: Joi.string()
                .trim()
                .min(3)
                .max(50)
                .required()
                .messages(getErrorMessages("area"))
                .custom((value, helpers) => {
                    let checkResult = detectBad(value);
                    if (checkResult === "error") return helpers.message(message);
                    else return checkResult;
                }),
			},
		}),
 
        propertyType: Joi.string()
            .valid("apartment", "villa", "house", "land")
            .required(), 
        price: Joi.number().max(1e9).required(),
        status: Joi.string().valid("available", "sold", "deleted").required(),
        suitableForTurkishCitizenship: Joi.boolean().required(),
        numberOfRooms: Joi.number().integer().max(100).required(),
        paymentMethods: Joi.string()
            .valid("Cash", "Installments", "Both")
            .required(),
        features: Joi.array()
            .items(Joi.number().integer().min(1).max(1e7).required())
            .min(2)
            .required(),
    }),
    params: Joi.object({
        id: Joi.number().integer().required().min(1).max(1e7),
    }),
    query: Joi.object({}),
    empty: Joi.object({}),
};
