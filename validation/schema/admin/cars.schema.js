import Joi from "joi";

import detectBad from "../../../utils/modifyText/detectBad.js";
import { getErrorMessages, message } from "../../../utils/getMessageError.js";
let yearNow = new Date().getFullYear();
export const schema = {
	body: Joi.object({
		carName: Joi.string()
			.trim()
			.min(3)
			.max(250)
			.required()
			.messages(getErrorMessages("carName"))
			.custom((value, helpers) => {
				let checkResult = detectBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		manufacturingYear: Joi.number().integer().required().max(yearNow),
		carType: Joi.string().valid("benzin", "dizel").required(),
		carPresence: Joi.string().valid("Sakarya", "Istanbul").required(),
		rental: Joi.object({
			threeDay: Joi.number().integer().max(1e7).required(),
			sevenDay: Joi.number().integer().max(1e7).required(),
			fifteenthDay: Joi.number().integer().max(1e7).required(),
			monthly: Joi.number().integer().max(1e7).required(),
		}).required(),
	}),
	params: Joi.object({
		id: Joi.number().integer().required().min(1).max(1e7),
	}),
	query: Joi.object({}),
	empty: Joi.object({}),
}; 
