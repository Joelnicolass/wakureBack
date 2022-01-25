"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking_controller");
const router = (0, express_1.Router)();
// routes
// verify availability ----------------------------------------------------------
router.post("/verify", booking_controller_1.bookingController.verifyAvailability);
// create ticket ----------------------------------------------------------
router.post("/add", booking_controller_1.bookingController.createTicket);
exports.default = router;
//# sourceMappingURL=booking_router.js.map