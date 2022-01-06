import { Router } from "express";
import { wakureController } from "../controllers/wakure_controller";

const router = Router();

// routes

// create wakure
router.post("/new", wakureController.addWakure);
// update geolocation wakure by id
router.put("/geolocation/:id", wakureController.updateGeolocationWakure);
// get geolocation wakure by id
router.get("/geolocation/:id", wakureController.getGeolocationWakure);

export default router;
