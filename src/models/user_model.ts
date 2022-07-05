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
        surname: user.surname,
        address: user.address,
        phone: user.phone,
        email: user.email,
        password: user.password,
        owner_products_id: user.owner_products_id,
        client_products_id: user.client_products_id,
        ticket_id: user.ticket_id,
        friends_id: user.friends_id,
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

  // get users by ids

  public static async getUsersByIds(
    ids: String[] | undefined
  ): Promise<IUser[] | null> {
    try {
      return await User.find({ _id: { $in: ids } });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get user by email and statusDB = true

  public static async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email, statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get user by id and statusDB = true

  public static async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id);
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

  // add wakure to owner_products_id

  public static async addWakureToOwnerProductsId(
    id: string,
    wakureId: string
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        { $push: { owner_products_id: wakureId } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // update role

  public static async updateRole(
    id: string,
    roleType: string
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        { role: roleType },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // delete wakure from owner_products_id

  public static async deleteWakureFromOwnerProductsId(
    id: string,
    wakureId: string
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        { $pull: { owner_products_id: wakureId } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // add user to friends_id

  public static async addUserToFriendsId(
    id: string,
    friendId: string
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        { $push: { friends_id: friendId } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // delete user from friends_id

  public static async deleteUserFromFriendsId(
    id: string,
    friendId: string
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        { $pull: { friends_id: friendId } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

export default UserModel;
