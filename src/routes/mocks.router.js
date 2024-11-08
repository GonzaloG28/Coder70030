import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";


const router = Router()

router.get("/mockingpets", mocksController.createMocksPets)
router.get("/mockingusers", mocksController.createMocksUsers)
router.post("/generateData", mocksController.generateData)
export default router