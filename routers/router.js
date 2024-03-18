import express from "express";
const router = express.Router();
import authApi from "./auth.router.js";
import adminApi from "./admin/index.js";
import publicApi from "./public.router.js";
import { StatusCodes } from "http-status-codes";
 
router.use("/auth", authApi);
router.use("/admin", adminApi);
router.use("/", publicApi);

router.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send("Error 404 not found page");
});
export default router;
