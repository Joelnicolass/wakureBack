import { Request, Response } from "express";
import { Roles } from "../helpers/roles_enum";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import Validator from "../utils/validator";

//get -----------------------------------------------------

class UserController {
  // get all users with statusDB = true
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.getAllUsers();
      if (users !== null) {
        res.status(200).json(users);
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // get user by name
  public async getUserByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    try {
      const user = await UserModel.getUserByName(name);
      if (user !== null) {
        res.status(200).json(user);
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // post -----------------------------------------------------

  // put -----------------------------------------------------

  public updatePassword(req: Request, res: Response): void {
    const { name } = req.params;
    const { body } = req;
  }

  // delete -----------------------------------------------------

  // delete user by name

  public async deleteUserByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    //validate if user exists

    try {
      if (!(await Validator.verifyUser(name))) {
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

    // delete user

    try {
      if (await UserModel.deleteUserByName(name)) {
        res.status(200).json({
          msg: "user deleted",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }
}

export const userController = new UserController();
