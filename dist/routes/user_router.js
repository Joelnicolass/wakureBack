"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const router = (0, express_1.Router)();
// routes
//get all users ---------------------------------------------------------
// -> { status 200, json users[] }
router.get("/", user_controller_1.userController.getAllUsers);
// get user by name -----------------------------------------------------
// { name: string } -> { status 200, json user }
router.get("/:name", user_controller_1.userController.getUserByName);
// delete user ----------------------------------------------------------
// { name: string } -> { status 200, json user }
router.delete("/:name", user_controller_1.userController.deleteUserByName);
// update pass ----------------------------------------------------------
// { name: string, password: string } -> { status 200, json user }
router.put("/:name", user_controller_1.userController.updatePassword);
// export
exports.default = router;
//# sourceMappingURL=user_router.js.map