import express from "express";
const router = express.Router();
import control from "../controllers/public.controller.js";
import { schema } from "../validation/schema/public.schema.js";
import { type, validate, execute } from "../config/header_routers.js";
// import { cacheMiddleware } from "../middleware/cache.js";
import { publicLimit } from "../middleware/limit.js";

router.get(
    "/features",
    validate(schema.empty, type.query),
    execute(control.features)
);
//! projects 
router.get(
    "/projects",
    publicLimit,
    // cacheMiddleware,
    validate(schema.query, type.query),
    execute(control.getAllProject)
);
router.get(
    "/projects/:id",
    publicLimit,
    // cacheMiddleware,
    validate(schema.language, type.query),
    validate(schema.params, type.params),
    execute(control.getProject)
);

// ! cars 
router.get(
    "/cars",
    publicLimit,
    // cacheMiddleware,
    validate(schema.queryCars, type.query),
    execute(control.getAllCar)
);
router.get(
    "/cars/:id",
    publicLimit,
    // cacheMiddleware, 
    validate(schema.params, type.params),
    execute(control.getCar)
);
export default router;
