import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import {
	Features,
	ProjectFeatures,
	Projects,
	images,
} from "../../models/index.js";
import { sequelize } from "../../utils/connect.js";
import { Op } from "sequelize";
import fileProcessing from "../../utils/fileprocissing.js";
// import { emptyRedis } from "../../utils/redis_cache.js";
import lodash from "lodash"; 
export default {
	/*
	 * @category admins
	 * private admin
	 * @method POST
	 * @work create category
	 */
	create: async (req, res, next) => {
		let featuresIds = Array.from(
			new Set(
				req.body.features.map((item) =>
					typeof item == "string" ? +item : item
				)
			)
		);

		let allFeatures = await Features.findAll({
			raw: true,
			attributes: ["id"],
		});

		allFeatures = allFeatures.map((item) => item.id);
		featuresIds.map((id) => {
			if (!allFeatures.includes(id))
				throw new Error("بعض الميزات المدخلة غير صحيحة");
		}); 
		let check = await Projects.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				[Op.and]: [
					{
						"projectName.ar": req.body.multiLanguages.ar.projectName.trim(),
					},
					{
						"projectName.en":  req.body.multiLanguages.en.projectName.trim(),
					},
					{
						"projectName.tr":  req.body.multiLanguages.tr.projectName.trim(),
					},
				], 
				price: req.body.price,
				propertyType: req.body.propertyType.trim(),
			},
		}); 
		if (check) throw new Error("المشروع موجود من قبل");

		let forCreation = {
			projectName: {
				ar: req.body.multiLanguages.ar.projectName.trim(),
				en: req.body.multiLanguages.en.projectName.trim(),
				tr: req.body.multiLanguages.tr.projectName.trim(),
			},
			description: {
				ar: req.body.multiLanguages.ar.description.trim(),
				en: req.body.multiLanguages.en.description.trim(),
				tr: req.body.multiLanguages.tr.description.trim(),
			},
			city: {
				ar: req.body.multiLanguages.ar.city.trim(),
				en: req.body.multiLanguages.en.city.trim(),
				tr: req.body.multiLanguages.tr.city.trim(),
			},
			area: {
				ar: req.body.multiLanguages.ar.area.trim(),
				en: req.body.multiLanguages.en.area.trim(),
				tr: req.body.multiLanguages.tr.area.trim(),
			},
			...lodash.omit(req.body, "multiLanguages"),
		};
		await sequelize.transaction(async (transaction) => {
			let projectInfo = await Projects.create(
				{ ...forCreation },
				{ transaction }
			);

			let bulkCreation = featuresIds.map((item) => {
				return { project_id: projectInfo.id, FeatureId: item };
			});
			await ProjectFeatures.bulkCreate(bulkCreation, {
				transaction,
			});
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: "تمت عملية الانشاء بنجاح",
		});
	},
	/*
	 * @category admins
	 * private admin
	 * @method PUT
	 * @work update category
	 */

	update: async (req, res) => {
	
        
		if (
			!(await Projects.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.params.id },
			}))
		)
			throw new Error("رقم المشروع المدخل غير صحيح");
            let featuresIds = Array.from(
                new Set(
                    req.body.features.map((item) =>
                        typeof item == "string" ? +item : item
                    )
                )
            );
    
            let allFeatures = await Features.findAll({
                raw: true,
                attributes: ["id"],
            });
    
            allFeatures = allFeatures.map((item) => item.id);
            featuresIds.map((id) => {
                if (!allFeatures.includes(id))
                    throw new Error("بعض الميزات المدخلة غير صحيحة");
            }); 
            let check = await Projects.findOne({
                raw: true,
                attributes: ["id"],
                where: {
                    [Op.and]: [
                        {
                            "projectName.ar": req.body.multiLanguages.ar.projectName.trim(),
                        },
                        {
                            "projectName.en":  req.body.multiLanguages.en.projectName.trim(),
                        },
                        {
                            "projectName.tr":  req.body.multiLanguages.tr.projectName.trim(),
                        },
                    ], 
                    price: req.body.price,
                    propertyType: req.body.propertyType.trim(),
                    id:{[Op.not]:req.params.id}
                },
            }); 
            if (check) throw new Error("المشروع موجود من قبل");
 
        let forCreation = {
			projectName: {
				ar: req.body.multiLanguages.ar.projectName.trim(),
				en: req.body.multiLanguages.en.projectName.trim(),
				tr: req.body.multiLanguages.tr.projectName.trim(),
			},
			description: {
				ar: req.body.multiLanguages.ar.description.trim(),
				en: req.body.multiLanguages.en.description.trim(),
				tr: req.body.multiLanguages.tr.description.trim(),
			},
			city: {
				ar: req.body.multiLanguages.ar.city.trim(),
				en: req.body.multiLanguages.en.city.trim(),
				tr: req.body.multiLanguages.tr.city.trim(),
			},
			area: {
				ar: req.body.multiLanguages.ar.area.trim(),
				en: req.body.multiLanguages.en.area.trim(),
				tr: req.body.multiLanguages.tr.area.trim(),
			},
			...lodash.omit(req.body, "multiLanguages"),
		};
	 
		await sequelize.transaction(async (transaction) => {
			await Projects.update(
				{  ...forCreation },
				{ where: { id: req.params.id }, transaction }
			);

			let bulkCreation = featuresIds.map((item) => {
				return { project_id: req.params.id, FeatureId: item };
			});
			await ProjectFeatures.destroy({
				where: { project_id: req.params.id },
				transaction,
			});
			await ProjectFeatures.bulkCreate(bulkCreation, {
				transaction,
			});
		});
 
		// await emptyRedis();
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: "تمت العملية بنجاح",
		});
	},
	/*
	 * @category admins
	 * private admin
	 * @method DELETE
	 * @work delete category
	 */

	remove: async (req, res) => {
		let check = await Projects.findOne({
			raw: true,
			attributes: ["id"],
			where: { id: req.params.id },
			nest: true,
		});

		if (!check) throw new Error("المشروع المختار غير موجود");

		let files = await images.findAll({
			raw: true,
			nest: true,
			attributes: ["file_name"],
			where: { project_id: req.params.id },
		});

		// delete all images
		await Promise.all(
			files.map(async (image) => {
				await fileProcessing.deleteFile(image.file_name);
			})
		);
		await Projects.destroy({ where: { id: req.params.id } });

		// await emptyRedis();
		res.status(StatusCodes.OK).json({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},

	upload: async (req, res) => {
     if(!req.files)
     throw new Error("الملف المرفع يحتوي نسق غير صحيح")
 
		if (
			!(await Projects.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.params.id },
			}))
		)
			throw new Error("رقم المشروع الدخل غير صحيح");

		let imagesBulk = [];

		await Promise.all(
			req.files.map(async (file) => {
				await fileProcessing
					.fileSave([file])
					.then((file) => {
						imagesBulk.push({
							file_name: file[0].file_name,
							originalname: file[0].originalname,
							project_id: req.params.id,
						});
					})
					.catch(async (error) => {
						await Promise.all(
							req.files.map((item) => {
								fileProcessing.deleteFile(item.filename);
							})
						);
					});
			})
		);
		await images.bulkCreate(imagesBulk);
		// await emptyRedis();
		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الرفع بنجاح",
		});
	},
	deleteImage: async (req, res) => {
		let check = await images.findOne({
			raw: true,
			attributes: ["file_name"],
			where: { id: req.params.id },
		});
		if (!check) throw new Error("الصورة المدخلة غير صحيح");

		await fileProcessing.deleteFile(check.file_name);
		await images.destroy({
			where: { id: req.params.id },
		});
		// await emptyRedis();
		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
};
