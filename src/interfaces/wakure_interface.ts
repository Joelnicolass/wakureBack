import mongoose from "mongoose";

// interface for wakure

export interface IWakure extends mongoose.Document {
  id: string;
  name: string;
  geolocation: {
    lat: number;
    lng: number;
  };
  hasOwner: boolean;
  statusDB: boolean;
}
