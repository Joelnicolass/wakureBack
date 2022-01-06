"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
const router = (0, express_1.Router)();
// routes
// create user ----------------------------------------------------------
// { name: string, email: string, password: string } -> { status 200, json user, token }
router.post("/signup", auth_controller_1.authController.signup);
router.post("/signin", auth_controller_1.authController.signin);
router.post("/signout", auth_controller_1.authController.signout);
router.get("/profile", auth_controller_1.authController.profile);
exports.default = router;
//# sourceMappingURL=auth_router.js.map