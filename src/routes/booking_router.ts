import { Router } from "express";
import { bookingController } from "../controllers/booking_controller";

const router = Router();

// routes

// verify availability ----------------------------------------------------------------
router.post("/:id/verify", bookingController.verifyAvailability);
// create ticket ----------------------------------------------------------------------
router.post("/:id/add", bookingController.createTicket);
// update ticket status ---------------------------------------------------------------
router.put("/:id/updatestatus", bookingController.updateStatus);
// get all tickets when status not equal to ARCHIVED ----------------------------------
router.get("/:id/all", bookingController.getAllTickets);
// update availability days wakure ----------------------------------------------------
router.put("/:id/availabledays", bookingController.updateWakureAvailableDays);
// get available days wakure ----------------------------------------------------------
router.post("/:id/getavailabledays", bookingController.getWakureAvailableDays);
// get all tickets when status is ARCHIVED --------------------------------------------
router.get("/:id/archived", bookingController.getAllArchivedTickets);

export default router;
