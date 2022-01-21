"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friends_controller_1 = require("../controllers/friends_controller");
const router = (0, express_1.Router)();
// get my list of friends ----------------------------------------------------------
router.get("/:id/all", friends_controller_1.friendsController.getFriends);
// add friend ----------------------------------------------------------
// update friends_id
router.put("/:id/add", friends_controller_1.friendsController.addFriend);
// delete friend ----------------------------------------------------------
router.delete("/:id/delete", friends_controller_1.friendsController.deleteFriend);
// get friend by id ----------------------------------------------------------
router.get("/:id/get/:idFriend", friends_controller_1.friendsController.getFriendById);
//TODO SEND SOLICITATION TO FRIEND
exports.default = router;
//# sourceMappingURL=friends_router.js.map