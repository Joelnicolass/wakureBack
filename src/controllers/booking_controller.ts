import { Request, Response } from "express";
import { ITicket } from "../interfaces/ticket_interface";
import { TicketStatus } from "../helpers/ticket_status_enum";
import TicketModel from "../models/ticket_model";
import ConvertDateTimeToMoment from "../utils/convert_timedate";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import WakureModel from "../models/wakure_model";
import { IWakure } from "../interfaces/wakure_interface";

import moment from "moment";
import PrepareInfo from "../utils/prepare_info";

class BookingController {
  public async verifyAvailability(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const { id } = req.params;

    // convert dateFrom and timeFrom to datetime moment
    const { dateFrom, dateTo, timeFrom, timeTo } = body;
    const { dateFromMoment, dateToMoment } =
      ConvertDateTimeToMoment.convertToMoment(
        dateFrom,
        dateTo,
        timeFrom,
        timeTo
      );

    // check if dateFrom is before dateTo
    if (dateFromMoment.isAfter(dateToMoment)) {
      res.status(400).json({ msg: "dateFrom is after dateTo" });
      return;
    }

    // check if dateFrom is before now
    if (dateFromMoment.isBefore(moment())) {
      res.status(400).json({ msg: "dateFrom is before now" });
      return;
    }

    // get info from user
    let user: IUser | null;
    let owner_products_id: Array<string> | null;
    let tickets: Array<ITicket> | null;
    let wakureUnavailable: Array<string> | null = [];
    let wakureAvailable: Array<string> | null = [];

    try {
      user = await UserModel.getUserById(id);
      if (user !== null) {
        owner_products_id = user.owner_products_id;
      } else {
        res.status(500).json({ msg: "error" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // verify if the wakure is available

    owner_products_id = PrepareInfo.formatArray(owner_products_id);

    console.log(owner_products_id);
    if (owner_products_id === null) {
      res.status(500).json({ msg: "error" });
      return;
    }
    for (let i = 0; i < owner_products_id.length; i++) {
      try {
        tickets = await TicketModel.getAllTicketsByIdWakure(
          owner_products_id[i]
        );
        if (tickets !== null) {
          for (let j = 0; j < tickets.length; j++) {
            const ticket = tickets[j];
            const {
              dateFromMoment: ticketDateFromMoment,
              dateToMoment: ticketDateToMoment,
            } = ConvertDateTimeToMoment.convertToMoment(
              ticket.dateFrom,
              ticket.dateTo,
              ticket.timeFrom,
              ticket.timeTo
            );
            if (
              dateFromMoment.isBetween(
                ticketDateFromMoment,
                ticketDateToMoment,
                null,
                "[]"
              ) ||
              dateToMoment.isBetween(
                ticketDateFromMoment,
                ticketDateToMoment,
                null,
                "[]"
              )
            ) {
              if (wakureUnavailable.length === 0) {
                wakureUnavailable = [owner_products_id[i]];
              } else {
                wakureUnavailable.push(owner_products_id[i]);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error" });
        return;
      }
    }

    if (wakureUnavailable !== null) {
      wakureAvailable = owner_products_id.filter(
        (id) => !wakureUnavailable!.includes(id)
      );
    }

    // get info from wakure
    let wakuresAva: Array<IWakure> | null;
    try {
      wakuresAva = await WakureModel.getWakuresByIds(wakureAvailable);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    let wakuresUnava: Array<IWakure> | null;
    try {
      wakuresUnava = await WakureModel.getWakuresByIds(wakureUnavailable);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // create object to send

    const availability = {
      wakuresAvailable: wakuresAva!.map((wakure) => {
        return {
          id: wakure.id,
          name: wakure.name,
        };
      }),
      wakuresUnavailable: wakuresUnava!.map((wakure) => {
        return {
          id: wakure.id,
          name: wakure.name,
        };
      }),
    };

    res.status(200).json(availability);

    // reset arrays
    wakureUnavailable = [];
    wakureAvailable = [];
    wakuresAva = [];
    wakuresUnava = [];

    return;
  }

  public async createTicket(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const { id } = req.params;

    // convert dateFrom and timeFrom to datetime moment
    const { dateFrom, dateTo, timeFrom, timeTo } = body;
    const { dateFromMoment, dateToMoment } =
      ConvertDateTimeToMoment.convertToMoment(
        dateFrom,
        dateTo,
        timeFrom,
        timeTo
      );

    // check if dateFrom is before dateTo
    if (dateFromMoment.isAfter(dateToMoment)) {
      res.status(400).json({ msg: "dateFrom is after dateTo" });
      return;
    }

    // check if dateFrom is before now
    if (dateFromMoment.isBefore(moment())) {
      res.status(400).json({ msg: "dateFrom is before now" });
      return;
    }

    // get info from user
    let user: IUser | null;
    let owner_products_id: Array<string> | null;
    let tickets: Array<ITicket> | null;
    let wakureUnavailable: Array<string> | null = [];
    let wakureAvailable: Array<string> | null = [];

    try {
      user = await UserModel.getUserById(id);
      if (user !== null) {
        owner_products_id = user.owner_products_id;
      } else {
        res.status(500).json({ msg: "error" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // verify if the wakure is available

    owner_products_id = PrepareInfo.formatArray(owner_products_id);

    if (owner_products_id === null) {
      res.status(500).json({ msg: "error" });
      return;
    }
    for (let i = 0; i < owner_products_id.length; i++) {
      try {
        tickets = await TicketModel.getAllTicketsByIdWakure(
          owner_products_id[i]
        );
        if (tickets !== null) {
          for (let j = 0; j < tickets.length; j++) {
            const ticket = tickets[j];
            const {
              dateFromMoment: ticketDateFromMoment,
              dateToMoment: ticketDateToMoment,
            } = ConvertDateTimeToMoment.convertToMoment(
              ticket.dateFrom,
              ticket.dateTo,
              ticket.timeFrom,
              ticket.timeTo
            );
            if (
              dateFromMoment.isBetween(
                ticketDateFromMoment,
                ticketDateToMoment,
                null,
                "[]"
              ) ||
              dateToMoment.isBetween(
                ticketDateFromMoment,
                ticketDateToMoment,
                null,
                "[]"
              )
            ) {
              if (wakureUnavailable.length === 0) {
                wakureUnavailable = [owner_products_id[i]];
              } else {
                wakureUnavailable.push(owner_products_id[i]);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error" });
        return;
      }
    }

    if (wakureUnavailable !== null) {
      wakureAvailable = owner_products_id.filter(
        (id) => !wakureUnavailable!.includes(id)
      );
    }

    // get info from wakure
    let wakuresAva: Array<IWakure> | null;
    try {
      wakuresAva = await WakureModel.getWakuresByIds(wakureAvailable);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    let wakuresUnava: Array<IWakure> | null;
    try {
      wakuresUnava = await WakureModel.getWakuresByIds(wakureUnavailable);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // create object to send

    const availability = {
      wakuresAvailable: wakuresAva!.map((wakure) => {
        return {
          id: wakure.id,
          name: wakure.name,
        };
      }),
      wakuresUnavailable: wakuresUnava!.map((wakure) => {
        return {
          id: wakure.id,
          name: wakure.name,
        };
      }),
    };

    // verify if wakureUnavabile include body.id_wakure
    if (wakureUnavailable !== null) {
      if (wakureUnavailable.includes(body.id_wakure)) {
        res.status(400).json({ msg: "wakure is unavailable" });

        // reset arrays
        wakureUnavailable = [];
        wakureAvailable = [];
        wakuresAva = [];
        wakuresUnava = [];

        return;
      }
    }

    // create ticket object

    const newTticket = <ITicket>{
      id_owner: id,
      id_client: body.id_client,
      id_wakure: body.id_wakure,
      price: body.price,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
      timeFrom: body.timeFrom,
      timeTo: body.timeTo,
      status: TicketStatus.PENDING,
    };

    // create ticket in DB

    try {
      const newTicket = await TicketModel.createTicket(newTticket);
      if (newTicket !== null) {
        res.status(200).json(newTticket);
        // reset arrays
        wakureUnavailable = [];
        wakureAvailable = [];
        wakuresAva = [];
        wakuresUnava = [];
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
  }

  // update ticket status
  public async updateStatus(req: Request, res: Response): Promise<void> {
    // id
    // status
    // id_ticket
    const { body } = req;
    const { id } = req.params;

    // get ticket
    let ticket: ITicket | null;

    try {
      ticket = await TicketModel.getTicketById(body.id_ticket);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    if (ticket === null) {
      res.status(400).json({ msg: "ticket not found" });
      return;
    }

    // verify if the user is the owner of the ticket
    if (ticket.id_owner !== id) {
      res.status(400).json({ msg: "you are not the owner of the ticket" });
      return;
    }

    try {
      const newTicket = await TicketModel.updateStatus(
        body.id_ticket,
        body.status
      );
      res.status(200).json(newTicket);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
  }
}

export const bookingController = new BookingController();
