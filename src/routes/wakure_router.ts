import { Router } from "express";
import { wakureController } from "../controllers/wakure_controller";

const router = Router();

// routes

// create wakure
router.post("/new", wakureController.addWakure);

export default router;
