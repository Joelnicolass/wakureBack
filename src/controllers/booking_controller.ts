import { Request, Response } from "express";
import { ITicket } from "../interfaces/ticket_interface";
import { TicketStatus } from "../helpers/ticket_status_enum";
import TicketModel from "../models/ticket_model";
import ConvertDateTimeToMoment from "../utils/convert_timedate";

import moment from "moment";

class BookingController {
  public async createBooking(req: Request, res: Response): Promise<void> {
    const { body } = req;

    console.log(body);

    // convert dateFrom and timeFrom to datetime moment
    const { dateFrom, dateTo, timeFrom, timeTo } = body;
    const { dateFromMoment, dateToMoment } =
      ConvertDateTimeToMoment.convertToMoment(
        dateFrom,
        dateTo,
        timeFrom,
        timeTo
      );

    // TODO validate if wakure is available

    // TODO get user

    // TODO get ticket_id

    // TODO get all wakures

    // TODO get all tickets for wakure

    // get tickets when status = pending
    let tickets: ITicket[] | null;

    try {
      tickets = await TicketModel.getAllTickets();
      if (tickets !== null && tickets.length > 0) {
        for (let i = 0; i < tickets.length; i++) {
          const ticket = tickets[i];

          // convert dateFrom and timeFrom to datetime moment
          const {
            dateFromMoment: ticketDateFromMoment,
            dateToMoment: ticketDateToMoment,
          } = ConvertDateTimeToMoment.convertToMoment(
            ticket.dateFrom,
            ticket.dateTo,
            ticket.timeFrom,
            ticket.timeTo
          );

          // check if dateFrom and timeFrom is between ticket dateFrom and timeFrom and ticket dateTo and timeTo
          if (
            dateFromMoment.isBetween(
              ticketDateFromMoment,
              ticketDateToMoment,
              null,
              "[]"
            )
          ) {
            res.status(400).json({
              msg: "Wakure is not available at this time",
            });
            return;
          }
        }
        console.log("esta disponible");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
      return;
    }

    // create ticket object

    const ticket = <ITicket>{
      /* id_owner: body.id_owner,
      id_client: body.id_client,
      id_wakure: body.id_wakure,
      price: body.price, */
      id_owner: "1",
      id_client: "1",
      id_wakure: "1",
      price: 100,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
      timeFrom: body.timeFrom,
      timeTo: body.timeTo,
      status: TicketStatus.PENDING,
    };

    // create ticket in DB

    try {
      const newTicket = await TicketModel.createTicket(ticket);
      if (newTicket !== null) {
        res.status(200).json({ ticket });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

export const bookingController = new BookingController();
