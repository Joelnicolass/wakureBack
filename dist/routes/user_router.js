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
//-------------------------------------------------------
// get my wakures -----------------------------------------------------
// consulta para obtener los datos de los wakures del usuario
// { name: string } -> { status 200, json wakures[] }
router.get("/:id/wakures", user_controller_1.userController.getMyWakures);
// delete user ----------------------------------------------------------
// { name: string } -> { status 200, json user }
router.delete("/:name", user_controller_1.userController.deleteUserByName);
// update pass ----------------------------------------------------------
// { name: string, password: string } -> { status 200, json user }
router.put("/:name", user_controller_1.userController.updatePassword);
//OWNER REQUESTS
// add wakure ----------------------------------------------------------
// { name: string, code: string } -> { status 200, json user }
router.post("/:id/addwakure", user_controller_1.userController.addWakureToOwnerProductsId);
//delete Wakure From Owner Products Id ----------------------------------------------------------
// { id: string, code: string } -> { status 200, json user }
router.delete("/:id/wakure/:code", user_controller_1.userController.deleteWakureFromOwnerProductsId);
// export
exports.default = router;
//# sourceMappingURL=user_router.js.map