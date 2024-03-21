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

/**
 * @openapi
 * /cars:
 *   get:
 *      tags:
 *        - Cars 
 *     summary: Retrieve a list of cars
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

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


router.post(
    "/translate", 
    validate(schema.body, type.body), 
    execute(control.translate)
);
export default router;
