import { Router } from "express";
import { authController } from "../controllers/auth_controller";

const router = Router();

// routes

// create user ----------------------------------------------------------
// { name: string, surname: string, adress: string, phone: string, email: string, password: string }
// -> { status 200, json user, token }
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

export default router;
