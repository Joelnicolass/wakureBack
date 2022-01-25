import { Router } from "express";
import { bookingController } from "../controllers/booking_controller";

const router = Router();

// routes

// verify availability ----------------------------------------------------------
router.post("/verify", bookingController.verifyAvailability);

// create ticket ----------------------------------------------------------
router.post("/add", bookingController.createTicket);

export default router;
