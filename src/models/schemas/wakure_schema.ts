import mongoose from "mongoose";
import { IWakure } from "../../interfaces/wakure_interface";

const wakureSchema = new mongoose.Schema<IWakure>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  geolocation: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  hasOwner: {
    type: Boolean,
    required: true,
  },
  statusDB: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<IWakure>("Wakure", wakureSchema);
