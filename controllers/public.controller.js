import _ from "lodash";
import { StatusCodes } from "http-status-codes";

import Features from "../models/features.model.js";
import { Op } from "sequelize";
import Images from "../models/images.model.js";
import Projects from "../models/project.model.js";
import ProjectFeatures from "../models/project_features.model.js";
// import { addToRedisCache } from "../utils/redis_cache.js";

import { languages, translateTo } from "../utils/helper.js";

import { CarImages, Cars } from "../models/index.js";
let getLanguage = (text) => {
	// const detectedLanguage = detectedLanguages[0].language;
	let languageName;
	switch (detectedLanguage) {
		case "ar":
			languageName = "Arabic";
			break;
		case "tr":
			languageName = "Turkish";
			break;
		case "en":
			languageName = "English";
			break;
	}
	return languageName;
};
export default {
	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	features: async (req, res) => {
		let response = await Features.findAll({
			raw: true,
			nest: true,
			attributes: { exclude: ["createdAt"] },
		});

		let multiLanguages = {
			ar: response.map((item) => {
				return {
					id: item.id,
					name: JSON.parse(item.name).ar,
					description: JSON.parse(item.name).ar,
				};
			}),
			en: response.map((item) => {
				return {
					id: item.id,
					name: JSON.parse(item.name).en,
					description: JSON.parse(item.name).en,
				};
			}),
			tr: response.map((item) => {
				return {
					id: item.id,
					name: JSON.parse(item.name).tr,
					description: JSON.parse(item.name).tr,
				};
			}),
		};

		res.status(StatusCodes.OK).send({
			success: true,
			data: multiLanguages,
		});
	},
	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	getAllProject: async (req, res) => {
		let whereContent = {};
		if (req.query.search) {
			let search = req.query.search.trim();
			whereContent = {
				[Op.or]: [
					{
						projectName: {
							[Op.like]: `%${search}%`,
						},
					},
					{
						description: {
							[Op.like]: `%${search}%`,
						},
					},
				],
			};
		}
		let {
			page,
			size,
			numberOfRooms,
			suitableForTurkishCitizenship,
			startPrice,
			endPrice,
			lang,
		} = req.query;

		req.query = _.omit(req.query, [
			"search",
			"page",
			"size",
			"endPrice",
			"startPrice",
			"numberOfRooms",
			"suitableForTurkishCitizenship",
			"lang",
		]);
		if (numberOfRooms) whereContent.numberOfRooms = +numberOfRooms;
		if (suitableForTurkishCitizenship)
			whereContent.suitableForTurkishCitizenship =
				suitableForTurkishCitizenship == "true" ? true : false;

		if (startPrice && !endPrice)
			throw new Error("لا يمكنك ارسال بداية السعر بدون السعر النهائي");
		else if (endPrice && !startPrice)
			throw new Error("لا يمكنك ارسال نهاية السعر بدون السعر البدائي");
		else if (startPrice && endPrice)
			whereContent.price = { [Op.between]: [+startPrice, +endPrice] };

		let { count, rows } = await Projects.findAndCountAll({
			limit: +size,
			offset: (+page - 1) * +size,
			raw: true,
			where: {
				...whereContent,
				...req.query,
			},
		});

		let features;
		rows = await Promise.all(
			rows.map(async (projectInfo) => {
				// ! Features
				features = await ProjectFeatures.findAll({
					raw: true,
					nest: true,
					attributes: [],
					where: { project_id: projectInfo.id },
					include: { model: Features, required: true },
				});

				features = features.map((item) => {
					return {
						id: item.Feature.id,
						name: JSON.parse(item.Feature.name)[`${lang}`],
						description: JSON.parse(item.Feature.name)[`${lang}`],
					};
				});
				// ! Images of project
				let allImages =
					(await Images.findAll({
						raw: true,
						where: { project_id: projectInfo.id },
					})) || [];

				allImages = allImages.map((item) => {
					const imageName = item.file_name.split(".")[0];
					let image = {
						id: item.id,
						originalName: item.originalname,
						path: `${process.env.LINK}/${item.file_name}`,
						compressed: `${process.env.LINK}/${imageName}_comp.webp`,
					};
					return image;
				});

				// ! Project Info
				projectInfo = {
					...projectInfo,
					projectName: JSON.parse(projectInfo.projectName)[`${lang}`],
					description: JSON.parse(projectInfo.description)[`${lang}`],
					city: JSON.parse(projectInfo.city)[`${lang}`],
					area: JSON.parse(projectInfo.area)[`${lang}`],
				};

				return { ...projectInfo, features, images: allImages };
			})
		);

		let response = { success: true, data: { total: count, rows: rows } };
		// await addToRedisCache(req.originalUrl, JSON.stringify(response));
		res.status(StatusCodes.OK).send(response);
	},
	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	getProject: async (req, res) => {
		let { lang } = req.query;
		let projectInfo;
		let features;
		projectInfo = await Projects.findOne({
			raw: true,
			attributes: { exclude: ["updatedAt"] },
			where: {
				id: req.params.id,
			},
		});
		if (!projectInfo) throw new Error("رقم المشروع المدخل غير موجود");

		// ! Features
		features = await ProjectFeatures.findAll({
			raw: true,
			nest: true,
			attributes: [],
			where: { project_id: projectInfo.id },
			include: { model: Features, required: true },
		});

		features = features.map((item) => {
			return {
				id: item.Feature.id,
				name: JSON.parse(item.Feature.name)[`${lang}`],
				description: JSON.parse(item.Feature.name)[`${lang}`],
			};
		});

		let allImages =
			(await Images.findAll({
				raw: true,
				where: { project_id: req.params.id },
			})) || [];

		allImages = allImages.map((item) => {
			const imageName = item.file_name.split(".")[0];
			let image = {
				id: item.id,
				originalName: item.originalname,
				path: `${process.env.LINK}/${item.file_name}`,
				compressed: `${process.env.LINK}/${imageName}_comp.webp`,
			};
			return image;
		});

		// ! Project Info
		projectInfo = {
			...projectInfo,
			projectName: JSON.parse(projectInfo.projectName)[`${lang}`],
			description: JSON.parse(projectInfo.description)[`${lang}`],
			city: JSON.parse(projectInfo.city)[`${lang}`],
			area: JSON.parse(projectInfo.area)[`${lang}`],
		};

		let response = {
			success: true,
			data: { ...projectInfo, features, images: allImages },
		};
		 	res.status(StatusCodes.OK).send(response);
	},

	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	getAllCar: async (req, res) => {
		let whereContent = {};
		if (req.query.search) {
			let search = req.query.search.trim();

			whereContent = {
				carName: {
					[Op.like]: `%${search}%`,
				},
			};
		}
		let {
			page,
			size,
			manufacturingYear,
			carType,
			carPresence,
			startPrice,
			endPrice,
		} = req.query;

		if (manufacturingYear) whereContent.manufacturingYear = +manufacturingYear;

		if (carType) whereContent.carType = carType;

		if (carPresence) whereContent.carPresence = carPresence;

		if (startPrice && !endPrice)
			throw new Error("لا يمكنك ارسال بداية السعر بدون السعر النهائي");
		else if (endPrice && !startPrice)
			throw new Error("لا يمكنك ارسال نهاية السعر بدون السعر البدائي");
		else if (startPrice && endPrice)
			Object.assign(whereContent, {
				[Op.or]: [
					{
						"rental.threeDay": { [Op.between]: [+startPrice, +endPrice] },
					},
					{
						"rental.sevenDay": { [Op.between]: [+startPrice, +endPrice] },
					},
					{
						"rental.fifteenthDay": { [Op.between]: [+startPrice, +endPrice] },
					},
					{
						"rental.monthly": { [Op.between]: [+startPrice, +endPrice] },
					},
				],
			});
		let { count, rows } = await Cars.findAndCountAll({
			limit: +size,
			offset: (+page - 1) * +size,
			attributes: { exclude: ["updatedAt"] },
			raw: true,
			where: {
				...whereContent,
			},
		});

		rows = await Promise.all(
			rows.map(async (carInfo) => {
				let allImages =
					(await CarImages.findAll({
						raw: true,
						where: { car_id: carInfo.id },
					})) || [];

				allImages = allImages.map((item) => {
					const imageName = item.file_name.split(".")[0];
					let image = {
						id: item.id,
						originalName: item.originalname,
						path: `${process.env.LINK}/${item.file_name}`,
						compressed: `${process.env.LINK}/${imageName}_comp.webp`,
					};
					return image;
				});

				return {
					...carInfo,
					rental: JSON.parse(carInfo.rental),
					images: allImages,
				};
			})
		);
		let response = { success: true, data: { total: count, rows: rows } };

		res.status(StatusCodes.OK).send(response);
	},
	/*
	 * @interview admins
	 * private admin
	 * @method GET
	 * @work get all interview
	 */
	getCar: async (req, res) => {
		let carInfo = await Cars.findOne({
			raw: true,
			attributes: { exclude: ["updatedAt"] },
			where: {
				id: req.params.id,
			},
		});
		if (!carInfo) throw new Error("رقم السيارة المدخلة غير موجود");

		let allImages =
			(await CarImages.findAll({
				raw: true,
				where: { car_id: req.params.id },
			})) || [];

		allImages = allImages.map((item) => {
			const imageName = item.file_name.split(".")[0];
			let image = {
				id: item.id,
				originalName: item.originalname,
				path: `${process.env.LINK}/${item.file_name}`,
				compressed: `${process.env.LINK}/${imageName}_comp.webp`,
			};
			return image;
		});

		let response = {
			success: true,
			data: {
				...carInfo,
				rental: JSON.parse(carInfo.rental),
				images: allImages,
			},
		};
		res.status(StatusCodes.OK).send(response);
	},
};
