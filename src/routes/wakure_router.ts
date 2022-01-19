import { Router } from "express";
import { wakureController } from "../controllers/wakure_controller";

const router = Router();

// routes

// create wakure
router.post("/new", wakureController.addWakure);
// update geolocation wakure by id
// endpoint que va a utilizar el wakure para actualizar su ubicacion -------------------------------------------
router.put("/geolocation/:id", wakureController.updateGeolocationWakure);
// get geolocation wakure by id--------------------------
router.get("/geolocation/:id", wakureController.getGeolocationWakure);
//-------------------------------------------------------
//get All Wakures
// -> { status 200, json wakures[] }
//TODO: HACER LAS VALIDACIONES (token validator para verificar si sos el admin mas alto de todos)
router.get("/", wakureController.getAllWakures);

//  delete Wakure by id
// { id: string } -> { status 200, statusdb = false }
router.delete("/:id", wakureController.deleteWakureById);

export default router;
