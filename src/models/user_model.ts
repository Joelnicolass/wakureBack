// model for user using mongoose

import User from "./schemas/user_schema";
import { IUser } from "../interfaces/user_interface";

class UserModel {
  // create user

  public static async createUser(user: IUser): Promise<IUser | null> {
    try {
      const newUser = new User({
        role: user.role,
        name: user.name,
        email: user.email,
        password: user.password,
        statusDB: true,
      });
      newUser.password = await newUser.encryptPassword(user.password);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get user by name and statysDB = true

  public static async getUserByName(name: string): Promise<IUser | null> {
    try {
      return await User.findOne({ name, statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get user by email and statysDB = true

  public static async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email, statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get all users with statusDB = true

  public static async getAllUsers(): Promise<IUser[] | null> {
    try {
      return await User.find({ statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // update password

  public static async updateUser(user: IUser): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { name: user.name },
        { password: user.password },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // delete user by name

  public static async deleteUserByName(name: string): Promise<IUser | null> {
    try {
      return await User.findOneAndDelete({ name });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

export default UserModel;
