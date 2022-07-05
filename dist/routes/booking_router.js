"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking_controller");
const router = (0, express_1.Router)();
// routes
// verify availability ----------------------------------------------------------------
router.post("/:id/verify", booking_controller_1.bookingController.verifyAvailability);
// create ticket ----------------------------------------------------------------------
router.post("/:id/add", booking_controller_1.bookingController.createTicket);
// update ticket status ---------------------------------------------------------------
router.put("/:id/updatestatus", booking_controller_1.bookingController.updateStatus);
// get all tickets when status not equal to ARCHIVED ----------------------------------
router.get("/:id/all", booking_controller_1.bookingController.getAllTickets);
// update availability days wakure ----------------------------------------------------
router.put("/:id/availabledays", booking_controller_1.bookingController.updateWakureAvailableDays);
// get available days wakure ----------------------------------------------------------
router.post("/:id/getavailabledays", booking_controller_1.bookingController.getWakureAvailableDays);
// get all tickets when status is ARCHIVED --------------------------------------------
router.get("/:id/archived", booking_controller_1.bookingController.getAllArchivedTickets);
exports.default = router;
//# sourceMappingURL=booking_router.js.map