import { Request, Response } from "express";
import { ITicket } from "../interfaces/ticket_interface";
import { TicketStatus } from "../helpers/ticket_status_enum";
import TicketModel from "../models/ticket_model";
import ConvertDateTimeToMoment from "../utils/convert_timedate";
import { IUser } from "../interfaces/user_interface";
import UserModel from "../models/user_model";
import WakureModel from "../models/wakure_model";
import { IWakure } from "../interfaces/wakure_interface";
import { DaysName } from "../helpers/days_enum";

import moment from "moment";
import PrepareInfo from "../utils/prepare_info";
import BookingUtils from "../utils/booking_process";

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

    let daysBooking: Array<DaysName> = [];

    // get all days between dateFrom and dateTo
    for (let i = dateFromMoment; i.isBefore(dateToMoment); i.add(1, "days")) {
      daysBooking.push(i.day());
    }

    // get info from user
    let user: IUser | null;
    let owner_products_id: Array<string> | null;
    let tickets: Array<ITicket> | null;
    let wakureUnavailableIds: Array<string> | null = [];
    let wakureAvailableIds: Array<string> | null = [];

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
              if (wakureUnavailableIds.length === 0) {
                wakureUnavailableIds = [owner_products_id[i]];
              } else {
                wakureUnavailableIds.push(owner_products_id[i]);
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

    if (wakureUnavailableIds !== null) {
      wakureAvailableIds = owner_products_id.filter(
        (id) => !wakureUnavailableIds!.includes(id)
      );
    }

    // get info from wakure
    let wakuresAvailableObjects: Array<IWakure> | null;
    let filterDays: Array<string> = [];
    let daysUnavailable: Array<Number> | null;
    try {
      wakuresAvailableObjects = await WakureModel.getWakuresByIds(
        wakureAvailableIds
      );
      if (wakuresAvailableObjects !== null) {
        filterDays = BookingUtils.getWakureIdWithFilterDays(
          wakuresAvailableObjects,
          daysBooking
        );
      }

      wakureUnavailableIds.push(...filterDays);

      // check if wakure is available
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    let wakureUnavailableObjects: Array<IWakure> | null;
    try {
      wakureUnavailableObjects = await WakureModel.getWakuresByIds(
        wakureUnavailableIds
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // apply filter days

    wakuresAvailableObjects = wakuresAvailableObjects!.filter(
      (wakure) => !wakureUnavailableIds!.includes(wakure.id)
    );

    // create object to send
    const availability = {
      wakuresAvailable: wakuresAvailableObjects,
      wakuresUnavailable: wakureUnavailableObjects,
    };

    res.status(200).json(availability);

    // reset arrays
    wakureUnavailableIds = [];
    wakureAvailableIds = [];
    wakuresAvailableObjects = [];
    wakureUnavailableObjects = [];

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

    let daysBooking: Array<DaysName> = [];

    // get all days between dateFrom and dateTo
    for (let i = dateFromMoment; i.isBefore(dateToMoment); i.add(1, "days")) {
      daysBooking.push(i.day());
    }

    // get info from user
    let user: IUser | null;
    let owner_products_id: Array<string> | null;
    let tickets: Array<ITicket> | null;
    let wakureUnavailableIds: Array<string> | null = [];
    let wakureAvailableIds: Array<string> | null = [];

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
              if (wakureUnavailableIds.length === 0) {
                wakureUnavailableIds = [owner_products_id[i]];
              } else {
                wakureUnavailableIds.push(owner_products_id[i]);
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

    if (wakureUnavailableIds !== null) {
      wakureAvailableIds = owner_products_id.filter(
        (id) => !wakureUnavailableIds!.includes(id)
      );
    }

    // get info from wakure
    let wakuresAvailableObjects: Array<IWakure> | null;
    let filterDays: Array<string> = [];
    let daysUnavailable: Array<Number> | null;
    try {
      wakuresAvailableObjects = await WakureModel.getWakuresByIds(
        wakureAvailableIds
      );
      if (wakuresAvailableObjects !== null) {
        filterDays = BookingUtils.getWakureIdWithFilterDays(
          wakuresAvailableObjects,
          daysBooking
        );
      }

      wakureUnavailableIds.push(...filterDays);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    let wakuresUnavailableObjects: Array<IWakure> | null;
    try {
      wakuresUnavailableObjects = await WakureModel.getWakuresByIds(
        wakureUnavailableIds
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // apply filter days
    wakuresAvailableObjects = wakuresAvailableObjects!.filter(
      (wakure) => !wakureUnavailableIds!.includes(wakure.id)
    );

    // create object to send

    const availability = {
      wakuresAvailable: wakuresAvailableObjects!.map((wakure) => {
        return {
          id: wakure.id,
          name: wakure.name,
        };
      }),
      wakuresUnavailable: wakuresUnavailableObjects!.map((wakure) => {
        return {
          id: wakure.id,
          name: wakure.name,
        };
      }),
    };

    // verify if wakureUnavabile include body.id_wakure
    if (wakureUnavailableIds !== null) {
      if (wakureUnavailableIds.includes(body.id_wakure)) {
        res.status(400).json({ msg: "wakure is unavailable" });

        // reset arrays
        wakureUnavailableIds = [];
        wakureAvailableIds = [];
        wakuresAvailableObjects = [];
        wakuresUnavailableObjects = [];

        return;
      }
    }

    // parse price to number
    let price: number | null;
    try {
      price = parseInt(body.price);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // create ticket object

    const newTicket = <ITicket>{
      id_owner: id,
      id_client: body.id_client,
      id_wakure: body.id_wakure,
      price: price,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
      timeFrom: body.timeFrom,
      timeTo: body.timeTo,
      status: TicketStatus.PENDING,
    };

    console.log(newTicket);

    // create ticket in DB

    try {
      const newTicketSave = await TicketModel.createTicket(newTicket);

      if (newTicketSave !== null) {
        res.status(200).json(newTicketSave);
        // reset arrays
        wakureUnavailableIds = [];
        wakureAvailableIds = [];
        wakuresAvailableObjects = [];
        wakuresUnavailableObjects = [];
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

  // get all tickets by id_owner and status = PENDING

  public async getAllTickets(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    let tickets: Array<ITicket> | null;

    try {
      tickets = await TicketModel.getAllTicketsByIdOwnerNotArchived(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    if (tickets === null) {
      res.status(400).json({ msg: "ticket not found" });
      return;
    }

    res.status(200).json(tickets);
  }

  // update wakure available days
  public async updateWakureAvailableDays(
    req: Request,
    res: Response
  ): Promise<void> {
    const { days, wakureId } = req.body;
    const { id } = req.params;

    // get wakure
    let wakure: IWakure | null;

    try {
      wakure = await WakureModel.getWakureById(wakureId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    if (wakure === null) {
      res.status(400).json({ msg: "wakure not found" });
      return;
    }

    // get user info

    let user: IUser | null;
    try {
      user = await UserModel.getUserById(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // verify if the user is the owner of the ticket
    if (user === null) {
      res.status(400).json({ msg: "user not found" });
      return;
    }

    const userWakures = user.owner_products_id;

    if (!userWakures.includes(wakure.id)) {
      res.status(400).json({ msg: "you are not the owner of the wakure" });
      return;
    }

    days as number[];
    console.log(days);
    // update wakure available days
    try {
      const newWakure = await WakureModel.updateAvailablesDaysWakure(
        days,
        wakureId
      );
      res.status(200).json(newWakure);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
  }

  // get available days wakure
  public async getWakureAvailableDays(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const { wakureId } = req.body;

    // check if user is the owner of the wakure
    let wakure: IWakure | null;

    try {
      wakure = await WakureModel.getWakureById(wakureId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    if (wakure === null) {
      res.status(400).json({ msg: "wakure not found" });
      return;
    }

    // get user info

    let user: IUser | null;
    try {
      user = await UserModel.getUserById(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // verify if the user is the owner of the ticket
    if (user === null) {
      res.status(400).json({ msg: "user not found" });
      return;
    }

    const userWakures = user.owner_products_id;

    if (!userWakures.includes(wakure.id)) {
      res.status(400).json({ msg: "you are not the owner of the wakure" });
      return;
    }

    // get wakure available days

    res.status(200).json(wakure);
    return;
  }
}

export const bookingController = new BookingController();
