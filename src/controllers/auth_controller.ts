// authentication controller
import { Request, Response } from "express";
import { Roles } from "../helpers/roles_enum";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import Validator from "../utils/validator";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

class AuthController {
  //--------------------------------------------------------------
  //create user / register
  public async signup(req: Request, res: Response): Promise<void> {
    const { body } = req;

    // validate

    if (!Validator.fieldsCreateUser(body)) {
      res.status(400).json({
        msg: "name and password are required",
      });
      return;
    }

    if (!Validator.validateLength(body)) {
      res.status(400).json({
        msg: "name and password must be at least 4 characters",
      });
      return;
    }

    // verify if user exists
    try {
      if (await Validator.verifyUser(body.name)) {
        res.status(400).json({
          msg: "user already exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // verify if email exists

    try {
      if (await Validator.verifyEmail(body.email)) {
        res.status(400).json({
          msg: "email already exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // create user

    const user = <IUser>{
      name: body.name,
      email: body.email,
      password: body.password,
      role: Roles.USER,
      statusDB: true,
    };

    // save user
    try {
      const result = await UserModel.createUser(user);
      if (result !== null) {
        // jwt controller

        const token = jwt.sign(
          { _id: result._id, role: result.role },
          process.env.JWT_SECRET || "",
          {}
        );

        res.status(200).header("auth", token).json({ result });
        return;
      }
    } catch (error) {
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // --------------------------------------------------------------

  public async signin(req: Request, res: Response): Promise<void> {
    const { body } = req;

    // validate fields

    if (!Validator.fieldsLoginUser(body)) {
      res.status(400).json({
        msg: "name and password are required",
      });
      return;
    }

    // verify if user exists

    try {
      if (!(await Validator.verifyUser(body.name))) {
        res.status(400).json({
          msg: "user does not exist",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // obtain user

    try {
      const user = await UserModel.getUserByName(body.name);
      if (user !== null) {
        // jwt controller

        const matchPassword: boolean = await user.matchPassword(body.password);

        if (!matchPassword) {
          res.status(400).json({
            msg: "password is incorrect",
          });

          return;
        } else {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET || "",
            { expiresIn: 60 * 60 * 24 }
          );

          res.status(200).header("auth", token).json({ user });
          return;
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // --------------------------------------------------------------

  public async signout(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      msg: "signout",
    });
  }

  // --------------------------------------------------------------

  public async profile(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      msg: "profile",
    });
  }
}

export const authController = new AuthController();
