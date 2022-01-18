import Wakure from "./schemas/wakure_schema";
import { IWakure } from "../interfaces/wakure_interface";

class WakureModel {
  // add wakure
  public static async addWakure(wakure: IWakure): Promise<IWakure | null> {
    try {
      const newWakure = new Wakure({
        id: wakure.id,
        name: wakure.name,
        geolocation: wakure.geolocation,
        hasOwner: wakure.hasOwner,
        statusDB: true,
      });
      return await newWakure.save();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get wakure by id
  public static async getWakureById(id: string): Promise<IWakure | null> {
    try {
      return await Wakure.findOne({ id, statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  // get all wakures with statusDB = true
  public static async getAllWakures(): Promise<IWakure[] | null> {
    try {
      return await Wakure.find({ statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get all wakures where id is in array
  public static async getWakuresByIds(
    ids: string[]
  ): Promise<IWakure[] | null> {
    try {
      console.log(ids);
      return await Wakure.find({ id: { $in: ids }, statusDB: true });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // delete wakure
  public static async deleteWakure(id: string): Promise<IWakure | null> {
    try {
      return await Wakure.findOneAndUpdate({ id }, { statusDB: false });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  //update geolocation wakure

  public static async updateGeolocationWakure(
    wakure: IWakure
  ): Promise<IWakure | null> {
    try {
      return await Wakure.findOneAndUpdate(
        { id: wakure.id },
        { geolocation: wakure.geolocation },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // update name wakure
  public static async updateNameWakure(
    id: string,
    name: string
  ): Promise<IWakure | null> {
    try {
      return await Wakure.findOneAndUpdate(
        { id: id },
        { name: name },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // update hasOwner wakure
  public static async updateHasOwnerWakure(
    owner: boolean,
    id: string
  ): Promise<IWakure | null> {
    try {
      return await Wakure.findOneAndUpdate(
        { id: id },
        { hasOwner: owner },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // update name and hasOwner wakure
  public static async updateNameAndHasOwnerWakure(
    name: string,
    owner: boolean,
    id: string
  ): Promise<IWakure | null> {
    try {
      return await Wakure.findOneAndUpdate(
        { id: id },
        { name: name, hasOwner: owner },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

export default WakureModel;
