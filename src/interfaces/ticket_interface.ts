import { Moment } from "moment";
import mongoose from "mongoose";

// interface for ticket

export interface ITicket extends mongoose.Document {
  id_owner: string;
  id_client: string;
  id_wakure: string;
  price: number;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
  paymentLink: string;
  status: string;
}
