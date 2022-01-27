import { Request, Response } from "express";
import { Roles } from "../helpers/roles_enum";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import Validator from "../utils/validator";

class FriendsController {
  // add friend ----------------------------------------------------------
  public async sendRequest(req: Request, res: Response): Promise<void> {
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

  public async quickAddFriend(req: Request, res: Response): Promise<void> {
    const { name, surname, email, address, phone } = req.body;
    const { id } = req.params;

    console.log(name, surname, email, address, phone);

    let owner: IUser | null;
    let friend: IUser | null;

    // verify if user exist
    try {
      owner = await UserModel.getUserById(id);

      if (!owner) {
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

    // create object user for friend\

    //TODO generate aleatory password
    let password;

    friend = <IUser>{
      name: name,
      surname: surname,
      address: address,
      phone: phone,
      email: email,
      password: "WAKURECLIENT",
      role: Roles.CLIENT,
      owner_products_id: [""],
      client_products_id: [""],
      ticket_id: [""],
      friends_id: [""],
      statusDB: true,
    };

    // create user
    try {
      friend = await UserModel.createUser(friend);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // save friend

    try {
      const owner = await UserModel.addUserToFriendsId(id, friend?.id);
      res.status(200).json({ owner });
      // TODO send email

      return;
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

    let user: IUser | null;

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
      user = await UserModel.getUserById(id);

      if (!user) {
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

    // get friends from user
    const friends = user?.friends_id;

    // prepare info

    if (friends !== undefined) {
      if (friends[0] === "") {
        friends.shift();
      }

      if (friends.length === 0) {
        res.status(400).json({
          msg: "no friends",
        });
        return;
      }
    }

    try {
      const friends_info = await UserModel.getUsersByIds(friends);
      res.status(200).json(friends_info);
      return;
    } catch (error) {}

    res.status(400).json({
      msg: "no friends",
    });

    return;
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
