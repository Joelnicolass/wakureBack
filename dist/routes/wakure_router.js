"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wakure_controller_1 = require("../controllers/wakure_controller");
const router = (0, express_1.Router)();
// routes
// create wakure
router.post("/new", wakure_controller_1.wakureController.addWakure);
exports.default = router;
//# sourceMappingURL=wakure_router.js.map