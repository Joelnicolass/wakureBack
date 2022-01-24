import mongoose, { SchemaTypes } from "mongoose";
import { ITicket } from "../../interfaces/ticket_interface";

const ticketSchema = new mongoose.Schema<ITicket>({
  id_owner: {
    type: String,
    required: true,
  },
  id_client: {
    type: String,
    required: true,
  },
  id_wakure: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateFrom: {
    type: String,
    required: true,
  },
  dateTo: {
    type: String,
    required: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ITicket>("Ticket", ticketSchema);
