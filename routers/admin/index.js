import express from "express";
let router = express.Router();
import projectsApi from "./projects.router.js";
import carsApi from "./cars.router.js";
 
router.use("/projects", projectsApi); 
router.use("/cars", carsApi); 
export default router;
