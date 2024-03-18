import { StatusCodes } from "http-status-codes";
import path from "path";
import { Op } from "sequelize";
import _ from "lodash";

import useragent from "useragent";
import fsExtra from "fs-extra";
// import sharp

//UTILS
import { compare } from "../utils/bcrypt.js";
import { removePic } from "../utils/helper.js";
//MODELS
//CONTROLLER
import { imageStatus } from "../utils/enums.js";
import { convertToWebp } from "../utils/compressImage.js";
import { parserJson } from "../config/header_routers.js";
import Users from "../models/user.model.js";

export default {
    /*
     * @account
     * @private
     * @method GET
     * @work get profile
     */
    getProfile: async (req, res) => {
        let response = await Users.findOne({
            attributes: {
                exclude: ["role", "createdAt", "password"],
            },
            raw: true,
            where: {
                id: req.user.id,
            },
        });

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                ...response,
            },
        });
    },

    /*
     * @account
     * @private
     * @method PUT
     * @work update my profile
     */
    update: async (req, res) => {
        let user = await Users.findOne({
            attributes: ["id", "avatar"],
            where: {
                id: { [Op.ne]: req.user.id },
                username: req.body.username.trim(),
            },
            paranoid: false,
        });
        if (user) throw Error("اسم المستخدم موجود سابقا");

        let userInfo = await users.findOne({
            raw: true,
            attributes: { exclude: ["settings"] },
            where: {
                id: req.user.id,
            },
        });
        let checkForDelete = false;
        let avatarLinks = null;

        let avatarEdit = {};
        if (req.body.imageStatus == imageStatus.edit) {
            //!   image
            if (
                req.file &&
                (userInfo.avatar == null || userInfo.avatar != null)
            ) {
                let filenames = await convertToWebp(req.file.path, req);
                filenames.push(req.file.filename);
                avatarLinks = filenames.map((filename) => {
                    return process.env.LINK + `/images/${filename}`;
                });
                avatarEdit = { avatar: avatarLinks };
            } else if (!req.file && userInfo.avatar != null) {
                checkForDelete = true;
                avatarEdit = { avatar: null };
            } else if (!req.file) avatarEdit = { avatar: null };
        } else if (req.file) {
            if (req.file && (await fsExtra.pathExists(req.file.path))) {
                try {
                    await removePic(req.file.path);
                } catch (error) {}
            }
        }
        await users.update(
            { ..._.omit(userInfo, "avatar"), ...avatarEdit },
            { where: { id: userInfo.id } }
        );

        res.status(StatusCodes.OK).json({ success: true, data: avatarLinks });
        if (req.body.imageStatus === imageStatus.edit)
            if ((req.file && userInfo.avatar != null) || checkForDelete) {
                let avatars = parserJson(userInfo.avatar);

                if (avatars.length)
                    await Promise.all(
                        avatars.map(async (str) => {
                            let serverIndex = str.indexOf("/images/");
                            let removePath = path.join(
                                path.resolve(),
                                str.substring(serverIndex)
                            );
                            await removePic(removePath);
                        })
                    );
            }
    },
    /*
     * @account
     * @private
     * @method PUT
     * @work logout device
     */
    logoutDevice: async (req, res) => {
        let token = await devices.findOne({
            attributes: ["id"],
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });

        if (!token) throw Error("هذا الحساب مسجل خروج من هذا المتصفح");
        let agent = useragent.parse(req.headers["user-agent"]);

        let checkIfCurrentDevice = await devices.findOne({
            attributes: ["id"],
            where: {
                browser: agent.family,
                device: agent.device.toString(),
                userId: req.user.id,
                id: req.params.id,
            },
        });
        if (checkIfCurrentDevice)
            throw Error("لا يمكنك تسجيل الخروج من الجهاز الحالي");

        res.status(StatusCodes.OK).json({
            success: true,
            msg: "تم تسجيل الخروج بنجاح ",
        });

        await token.destroy({});
    },
    /*
     * @account
     * @public
     * @method PUT
     * @work change password
     */
    changePassword: async (req, res) => {
        if (req.body.password == req.body.newPassword)
            throw Error("الرجاء ادخال كلمة مرور مختلفة عن الكلمة السابقة ");
        let userInfo = await user.findOne({
            where: {
                id: req.user.id,
            },
        });
        const validPassword = await compare(
            req.body.password,
            userInfo.password
        );

        if (!validPassword) {
            throw Error("كلمة المرور غير صحيحة ");
        }

        userInfo.password = req.body.newPassword;
        userInfo.save();
        res.status(StatusCodes.OK).json({ success: true });
    },
};
