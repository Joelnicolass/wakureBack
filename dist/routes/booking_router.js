"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking_controller");
const router = (0, express_1.Router)();
// routes
// verify availability ----------------------------------------------------------
router.post("/:id/verify", booking_controller_1.bookingController.verifyAvailability);
// create ticket ----------------------------------------------------------
router.post("/:id/add", booking_controller_1.bookingController.createTicket);
// update ticket status ----------------------------------------------------------
router.put("/:id/updatestatus", booking_controller_1.bookingController.updateStatus);
// get all tickets when status = PENDING ----------------------------------------------------------
router.get("/:id/all", booking_controller_1.bookingController.getAllTickets);
exports.default = router;
//# sourceMappingURL=booking_router.js.map