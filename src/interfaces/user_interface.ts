import mongoose from "mongoose";

// interface for user

export interface IUser extends mongoose.Document {
  role: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  owner_products_id: Array<string>;
  client_products_id: Array<string>;
  ticket_id: Array<string>;
  friends_id: Array<string>;
  statusDB: boolean;
  encryptPassword(password: string): Promise<string>;
  matchPassword(password: string): Promise<boolean>;
}
