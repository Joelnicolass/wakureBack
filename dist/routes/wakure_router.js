"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wakure_controller_1 = require("../controllers/wakure_controller");
const router = (0, express_1.Router)();
// routes
// create wakure
// FOR AMDMIN CONTROL
router.post("/new", wakure_controller_1.wakureController.addWakure);
//-------------------------------------------------------
// update geolocation wakure by id
// endpoint que va a utilizar el wakure para actualizar su ubicacion -------------------------------------------
router.put("/geolocation/:id", wakure_controller_1.wakureController.updateGeolocationWakure);
// get geolocation wakure by id--------------------------
router.get("/geolocation/:id", wakure_controller_1.wakureController.getGeolocationWakure);
//-------------------------------------------------------
//get All Wakures
// -> { status 200, json wakures[] }
//TODO: HACER LAS VALIDACIONES (token validator para verificar si sos el admin mas alto de todos)
router.get("/", wakure_controller_1.wakureController.getAllWakures);
//  delete Wakure by id
// { id: string } -> { status 200, statusdb = false }
router.delete("/:id", wakure_controller_1.wakureController.deleteWakureById);
exports.default = router;
//# sourceMappingURL=wakure_router.js.map