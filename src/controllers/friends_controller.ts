import { Request, Response } from "express";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import Validator from "../utils/validator";

class FriendsController {
  // add friend ----------------------------------------------------------
  public async addFriend(req: Request, res: Response): Promise<void> {
    const { friend_id } = req.body;
    const { id } = req.params;

    let user: IUser | null;

    // verify if user exist
    try {
      user = await UserModel.getUserById(id);

      if (!user) {
        res.status(400).json({
          msg: "user not exists",
        });
        return;
      }
      // verify if already friend
      if (user.friends_id.includes(friend_id)) {
        res.status(400).json({
          msg: "friend already exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    try {
      if (!(await Validator.verifyUserById(friend_id))) {
        res.status(400).json({
          msg: "friend not exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // save friend

    //TODO SEND SOLICITATION TO FRIEND

    try {
      const user = await UserModel.addUserToFriendsId(id, friend_id);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // delete friend ----------------------------------------------------------

  public async deleteFriend(req: Request, res: Response): Promise<void> {
    const { friend_id } = req.body;
    const { id } = req.params;

    try {
      if (!(await Validator.verifyUserById(id))) {
        res.status(400).json({
          msg: "user not exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    try {
      if (!(await Validator.verifyUserById(friend_id))) {
        res.status(400).json({
          msg: "friend not exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    try {
      const user = await UserModel.deleteUserFromFriendsId(id, friend_id);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // get friends ----------------------------------------------------------

  public async getFriends(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      if (!(await Validator.verifyUserById(id))) {
        res.status(400).json({
          msg: "user not exists",
        });

        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    try {
      // get user info
      const user = await UserModel.getUserById(id);

      // get friends from user
      const friends = user?.friends_id;

      // prepare info

      if (friends !== undefined) {
        if (friends[0] === "") {
          friends.shift();
        }

        if (friends.length === 0) {
          res.status(200).json({
            friends: [],
          });
        }
      }

      // get info from friends
      const friends_info = await UserModel.getUsersByIds(friends);

      res.status(200).json(friends_info);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // get friend by id ----------------------------------------------------------

  public async getFriendById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { friend_id } = req.body;

    console.log(friend_id);

    try {
      if (!(await Validator.verifyUserById(id))) {
        res.status(400).json({
          msg: "user not exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    try {
      if (!(await Validator.verifyUserById(friend_id))) {
        res.status(400).json({
          msg: "friend not exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    try {
      const user = await UserModel.getUserById(friend_id);

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }
}

export const friendsController = new FriendsController();
