// schema mongoose for user with typescript

import mongoose from "mongoose";
import { IUser } from "../../interfaces/user_interface";
import bcrypt from "bcryptjs";

// schema for user

const userSchema = new mongoose.Schema<IUser>({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  statusDB: {
    type: Boolean,
    required: true,
  },
});

// encrypt password methods

userSchema.methods.encryptPassword = async (
  password: string
): Promise<String> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// export user schema

export default mongoose.model<IUser>("User", userSchema);
