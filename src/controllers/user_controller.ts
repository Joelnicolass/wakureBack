import { Request, Response } from "express";
import { Roles } from "../helpers/roles_enum";
import { IUser } from "../interfaces/user_interface";
import { IWakure } from "../interfaces/wakure_interface";
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

    console.log("getMyWakures from controller db");

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

  // add wakure to owner_products_id

  public async addWakureToOwnerProductsId(
    req: Request,
    res: Response
  ): Promise<void> {
    // id params = id user
    // body.id = id wakure
    // body.name = name wakure
    const { id } = req.params;
    const { body } = req;

    //validates

    // verify if user exist
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

    //validate if wakure exists and if it has owner

    try {
      const wakure = await Validator.verifyWakureAndOwner(body.id);
      if (!wakure) {
        res.status(400).json({
          msg: "wakure does not exist or it has not owner",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // update name and hasOwner wakure

    try {
      const wakure = await WakureModel.updateNameAndHasOwnerWakure(
        body.name,
        true,
        body.id
      );
      if (wakure !== null) {
        // add wakure to owner_products_id
        const user = await UserModel.addWakureToOwnerProductsId(id, body.id);
        if (user !== null) {
          if (user.owner_products_id.length >= 2) {
            //update role to owner
            const user = await UserModel.updateRole(id, Roles.OWNER);
          }

          res.status(200).json({
            msg: "wakure added",
          });
          return;
        } else {
          res.status(500).json({
            msg: "error",
          });
          return;
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // delete wakure from owner_products_id

  public async deleteWakureFromOwnerProductsId(
    req: Request,
    res: Response
  ): Promise<void> {
    // id params = id user
    const { id, code } = req.params;

    //validates

    // verify if user exist
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

    //validate if wakure exists and if it has owner

    try {
      const wakure = await Validator.verifyWakureHasNotOwner(code);
      if (!wakure) {
        res.status(400).json({
          msg: "wakure does not exist or it has owner",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // delete wakure from owner_products_id

    try {
      const user = await UserModel.deleteWakureFromOwnerProductsId(id, code);
      if (user !== null) {
        // update role to user
        if (user.owner_products_id.length === 1) {
          const user = await UserModel.updateRole(id, Roles.CLIENT);
        }

        // update name and hasOwner wakure
        const wakure = await WakureModel.updateNameAndHasOwnerWakure(
          "WAKURE FANIOT",
          false,
          code
        );

        res.status(200).json({
          msg: "wakure deleted",
        });
        return;
      } else {
        res.status(500).json({
          msg: "error",
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
