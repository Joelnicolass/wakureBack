import { Request, Response } from "express";
import { Roles } from "../helpers/roles_enum";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import WakureModel from "../models/wakure_model";
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

  // get my wakures

  public async getMyWakures(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    console.log('llamda');

    //validate if user exists
    let user: IUser | null;
    try {
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

    console.log(user.owner_products_id);

    // get wakures

    try {
      const wakures = await WakureModel.getWakuresByIds(user.owner_products_id);
      if (wakures !== null) {
        res.status(200).json(wakures);
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
