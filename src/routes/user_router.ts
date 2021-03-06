import { Router } from "express";
import { userController } from "../controllers/user_controller";

const router = Router();

// routes

//get all users ---------------------------------------------------------
// -> { status 200, json users[] }
router.get("/", userController.getAllUsers);

// get user by name -----------------------------------------------------
// { name: string } -> { status 200, json user }
router.get("/:name", userController.getUserByName);
//-------------------------------------------------------
// get my wakures -----------------------------------------------------
// consulta para obtener los datos de los wakures del usuario
// { name: string } -> { status 200, json wakures[] }
router.get("/:id/wakures", userController.getMyWakures);

// delete user ----------------------------------------------------------
// { name: string } -> { status 200, json user }
router.delete("/:name", userController.deleteUserByName);

// update pass ----------------------------------------------------------
// { name: string, password: string } -> { status 200, json user }
router.put("/:name", userController.updatePassword);

// export
export default router;
