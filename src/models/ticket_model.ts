import { ITicket } from "../interfaces/ticket_interface";
import Ticket from "../models/schemas/ticket_schema";

class TicketModel {
  // create ticket
  public static async createTicket(ticket: ITicket): Promise<ITicket | null> {
    try {
      const newTicket = new Ticket({
        id_owner: ticket.id_owner,
        id_client: ticket.id_client,
        id_wakure: ticket.id_wakure,
        price: ticket.price,
        dateFrom: ticket.dateFrom,
        dateTo: ticket.dateTo,
        timeFrom: ticket.timeFrom,
        timeTo: ticket.timeTo,
        status: ticket.status,
      });
      return await newTicket.save();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // get all tickets when status = pending

  public static async getAllTickets(): Promise<ITicket[] | null> {
    try {
      return await Ticket.find({ status: "PENDING" });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

export default TicketModel;
