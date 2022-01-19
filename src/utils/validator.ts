// validate fields to create user

import { IUser } from "../interfaces/user_interface";
import { IWakure } from "../interfaces/wakure_interface";
import UserModel from "../models/user_model";
import WakureModel from "../models/wakure_model";

class Validator {
  // validate fields to create user

  public static fieldsCreateUser(body: IUser): boolean {
    if (
      !body.name ||
      !body.surname ||
      !body.address ||
      !body.phone ||
      !body.email ||
      !body.password ||
      body.name === "" ||
      body.password === "" ||
      body.surname === "" ||
      body.address === "" ||
      body.phone === "" ||
      body.email === ""
    ) {
      return false;
    }
    return true;
  }

  // validate length password

  public static validateLength(body: IUser): boolean {
    if (body.password.length < 6) {
      return false;
    }
    return true;
  }

  // validate fields to login user

  public static fieldsLoginUser(body: IUser): boolean {
    if (
      !body.email ||
      !body.password ||
      body.email === "" ||
      body.password === ""
    ) {
      return false;
    }
    return true;
  }

  // verify if user exists

  public static async verifyUser(name: string): Promise<boolean> {
    try {
      const user = await UserModel.getUserByName(name);
      console.log(name);
      if (user !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // verify if user exist by id
  public static async verifyUserById(id: string): Promise<boolean> {
    try {
      const user = await UserModel.getUserById(id);
      if (user !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // verify if user exist and verify if is owner
  public static async verifyUserAndOwner(id: string): Promise<IUser | boolean> {
    try {
      const user = await UserModel.getUserById(id);
      if (user !== null) {
        if (user.role === "OWNER") {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // verify if email exists

  public static async verifyEmail(email: string): Promise<boolean> {
    try {
      const user = await UserModel.getUserByEmail(email);
      if (user !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //WAKURE VALIDATORS --------------------------------

  //validate fields create wakure
  public static fieldsCreateWakure(body: IWakure): boolean {
    if (!body.name || !body.id || body.name === "" || body.id === "") {
      return false;
    }
    return true;
  }

  //verify if wakure exists
  public static async verifyWakure(id: string): Promise<boolean> {
    try {
      const wakure = await WakureModel.getWakureById(id);
      if (wakure !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //validate if wakure exists and if it has owner
  public static async verifyWakureAndOwner(
    id: string
  ): Promise<IWakure | boolean> {
    try {
      const wakure = await WakureModel.getWakureById(id);
      if (wakure !== null) {
        if (wakure.hasOwner) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //validate if wakure exists and if it has owner
  public static async verifyWakureHasNotOwner(
    id: string
  ): Promise<IWakure | boolean> {
    try {
      const wakure = await WakureModel.getWakureById(id);
      if (wakure !== null) {
        if (wakure.hasOwner) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default Validator;
