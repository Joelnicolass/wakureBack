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
      !body.password ||
      body.name === "" ||
      body.password === ""
    ) {
      return false;
    }
    return true;
  }

  // validate length password and name user

  public static validateLength(body: IUser): boolean {
    if (body.name.length < 4 || body.password.length < 4) {
      return false;
    }
    return true;
  }

  // validate fields to login user

  public static fieldsLoginUser(body: IUser): boolean {
    if (
      !body.name ||
      !body.password ||
      body.name === "" ||
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
}

export default Validator;
