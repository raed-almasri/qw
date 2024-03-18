import express from "express";
const router = express.Router();
import control from "../controllers/account.controllers.js";
import { schema } from "../validation/schema/account.schema.js";
import { auth, validate, type, execute } from "../config/header_routers.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { cache } from "../middleware/cache.js";

// router.get("/profile", auth, cache, execute(control.getProfile));

// router.put(
//     "/update",
//     auth,
//     uploadImage("avatar", "single"),
//     validate(schema.body.update, type.body),
//     execute(control.update)
// );

// /*
//  * @account
//  * @public
//  * @method POST
//  * @work change password
//  */
// router.put(
//     "/ch-pass",
//     auth,
//     validate(schema.body.changePassword, type.body),
//     execute(control.changePassword)
// );

// router.put("/logoutDevice/:id", auth, execute(control.logoutDevice));

export default router;
