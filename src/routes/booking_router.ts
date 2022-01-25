import { Router } from "express";
import { bookingController } from "../controllers/booking_controller";

const router = Router();

// routes

// verify availability ----------------------------------------------------------
router.post("/:id/verify", bookingController.verifyAvailability);
// create ticket ----------------------------------------------------------
router.post("/:id/add", bookingController.createTicket);
// update ticket status ----------------------------------------------------------
router.put("/:id/updatestatus", bookingController.updateStatus);

export default router;
