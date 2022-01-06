import { Request, Response } from "express";
import { Roles } from "../helpers/roles_enum";
import { IWakure } from "../interfaces/wakure_interface";
import WakureModel from "../models/wakure_model";
import Validator from "../utils/validator";

class WakureController {
  // add wakure

  public async addWakure(req: Request, res: Response): Promise<void> {
    const { body } = req;

    // validate

    if (!Validator.fieldsCreateWakure(body)) {
      res.status(400).json({
        msg: "name and description are required",
      });
      return;
    }

    // verify if wakure exists

    if (await Validator.verifyWakure(body.id)) {
      res.status(400).json({
        msg: "wakure already exists",
      });
      return;
    }

    // create wakure

    try {
      // create object wakure

      const wakure = <IWakure>{
        id: body.id,
        name: body.name,
        geolocation: {
          lat: -27.37008,
          lng: -55.99201,
        },
        booking: false,
        statusDB: true,
      };

      const result = await WakureModel.addWakure(wakure);
      if (result !== null) {
        res.status(200).json(result);
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // update geolocation wakure

  public async updateGeolocationWakure(
    req: Request,
    res: Response
  ): Promise<void> {
    const { body } = req;
    const { id } = req.params;

    //TODO validate

    // verify if wakure exists

    if (!(await Validator.verifyWakure(id))) {
      res.status(400).json({
        msg: "wakure does not exists",
      });
      return;
    }

    // get wakure by id

    let wakure: IWakure | null;

    try {
      wakure = await WakureModel.getWakureById(id);
      if (wakure == null) {
        res.status(400).json({
          msg: "wakure does not exists",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // create object wakure

    wakure = <IWakure>{
      id: id,
      name: wakure.name,
      geolocation: {
        lat: body.lat,
        lng: body.lng,
      },
      booking: wakure.booking,
      statusDB: wakure.statusDB,
    };

    // update geolocation wakure

    try {
      const result = await WakureModel.updateGeolocationWakure(wakure);

      if (result !== null) {
        res.status(200).json(result);
        return;
      }
      console.log(result + " updated");
      res.status(500).json({ msg: "Algo pasó" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }

  // get geolocation wakure

  public async getGeolocationWakure(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;

    // verify if wakure exists

    if (!(await Validator.verifyWakure(id))) {
      res.status(400).json({
        msg: "wakure does not exists",
      });
      return;
    }

    // get wakure by id

    try {
      const wakure = await WakureModel.getWakureById(id);
      if (wakure !== null) {
        res.status(200).json(wakure);
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }
  }
}

export const wakureController = new WakureController();
