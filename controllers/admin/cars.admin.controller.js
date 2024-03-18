import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import {
	Cars, 
	images,
} from "../../models/index.js"; 
import { Op } from "sequelize";
import fileProcessing from "../../utils/fileprocissing.js";
// import { emptyRedis } from "../../utils/redis_cache.js";
  
import CarImages from "../../models/carImages.model.js";
export default {
	/*
	 * @category admins
	 * private admin
	 * @method POST
	 * @work create category
	 */
	create: async (req, res, next) => {
		let check = await Cars.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				carName: req.body.carName.trim(),
				manufacturingYear: req.body.manufacturingYear,
				carType: req.body.carType.trim(),
				carPresence: req.body.carPresence.trim(),
			},
		});

		if (check) throw new Error("السيارة موجودة من قبل");

		await Cars.create({ ...req.body });
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
		let check = await Cars.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				carName: req.body.carName.trim(),
				manufacturingYear: req.body.manufacturingYear,
				carType: req.body.carType.trim(),
				carPresence: req.body.carPresence.trim(),
				id: { [Op.not]: req.params.id },
			},
		});

		if (check) throw new Error("السيارة موجودة من قبل");

		await Cars.update({ ...req.body },{where: { id: req.params.id }});
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
		let check = await Cars.findOne({
			raw: true,
			attributes: ["id"],
			where: { id: req.params.id },
			nest: true,
		});

		if (!check) throw new Error("السيارة المحددة غير موجودة");

		let files = await CarImages.findAll({
			raw: true,
			nest: true,
			attributes: ["file_name"],
			where: { car_id: req.params.id },
		});

		// delete all images
		await Promise.all(
			files.map(async (image) => {
				await fileProcessing.deleteFile(image.file_name);
			})
		);
		await Cars.destroy({ where: { id: req.params.id } });

		// await emptyRedis();
		res.status(StatusCodes.OK).json({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
	/*
	 * @category admins
	 * private admin
	 * @method DELETE
	 * @work delete category
	 */
    
	upload: async (req, res) => {
		if(!req.files)
		throw new Error("الملف المرفع يحتوي نسق غير صحيح")
	
		if (
			!(await Cars.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.params.id },
			}))
		)
			throw new Error("رقم السيارة المدخل  غير صحيح");

		let imagesBulk = [];
		await Promise.all(
			req.files.map(async (file) => {
				await fileProcessing
					.fileSave([file])
					.then((file) => {
						imagesBulk.push({
							file_name: file[0].file_name,
							originalname: file[0].originalname,
							car_id: req.params.id,
						});
					})
				
					
			})
		);
		await CarImages.bulkCreate(imagesBulk);
		// await emptyRedis();
		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الرفع بنجاح",
		});
	},
    	/*
    * @category admins
    * private admin
    * @method DELETE
    * @work delete category
    */
	deleteImage: async (req, res) => {
		let check = await CarImages.findOne({
			raw: true,
			attributes: ["file_name"],
			where: { id: req.params.id },
		});
		if (!check) throw new Error("الصورة المدخلة غير صحيح");

		await fileProcessing.deleteFile(check.file_name);
		await CarImages.destroy({
			where: { id: req.params.id },
		});
		// await emptyRedis();
		res.status(StatusCodes.OK).send({
			success: true,
			msg: "تمت عملية الحذف بنجاح",
		});
	},
};
