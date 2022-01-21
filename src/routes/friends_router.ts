import { Router } from "express";
import { userController } from "../controllers/user_controller";
import { friendsController } from "../controllers/friends_controller";

const router = Router();

// get my list of friends ----------------------------------------------------------
router.get("/:id/all", friendsController.getFriends);

// add friend ----------------------------------------------------------

router.put("/:id/requestFriend" /* friendsController.addFriend */); // TODO CAMBIAR TODO

// add friend ----------------------------------------------------------
// update friends_id
router.put("/:id/add", friendsController.quickAddFriend);

// delete friend ----------------------------------------------------------
router.delete("/:id/delete", friendsController.deleteFriend);

// get friend by id ----------------------------------------------------------
router.get("/:id/get", friendsController.getFriendById);

//TODO SEND SOLICITATION TO FRIEND

export default router;
