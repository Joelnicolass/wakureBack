import mongoose from "mongoose";

// interface for user

export interface IUser extends mongoose.Document {
  role: string;
  name: string;
  email: string;
  password: string;
  statusDB: boolean;
  products_id: string[];
  encryptPassword(password: string): Promise<string>;
  matchPassword(password: string): Promise<boolean>;
}
