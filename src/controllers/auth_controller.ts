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
        msg: "All fields are required",
      });
      return;
    }

    if (!Validator.validateLength(body)) {
      res.status(400).json({
        msg: "Password must be at least 6 characters",
      });
      return;
    }

    // verify if email exists

    try {
      if (await Validator.verifyEmail(body.email)) {
        res.status(400).json({
          msg: "Email already exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    //TODO verify if owner or client

    // TODO

    // create user

    const user = <IUser>{
      name: body.name,
      surname: body.surname,
      address: body.address,
      phone: body.phone,
      email: body.email,
      password: body.password,
      role: Roles.CLIENT,
      owner_products_id: [""],
      client_products_id: [""],
      ticket_id: [""],
      friends_id: [""],
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
        msg: "Email and password are required",
      });
      return;
    }

    // verify if user exists

    try {
      if (!(await Validator.verifyEmail(body.email))) {
        res.status(400).json({
          msg: "User does not exist",
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
      const user = await UserModel.getUserByEmail(body.email);
      if (user !== null) {
        // jwt controller

        const matchPassword: boolean = await user.matchPassword(body.password);

        if (!matchPassword) {
          res.status(400).json({
            msg: "Password is incorrect",
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
    // logout
    res.status(200).json({ msg: "logout" });

    return;
  }

  // --------------------------------------------------------------
}

export const authController = new AuthController();
