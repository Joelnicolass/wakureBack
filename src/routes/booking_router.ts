import { Router } from "express";
import { bookingController } from "../controllers/booking_controller";

const router = Router();

// routes

// add booking, create ticket ----------------------------------------------------------
router.post("/add", bookingController.createBooking);

export default router;
