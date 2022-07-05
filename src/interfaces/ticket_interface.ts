import { Moment } from "moment";
import mongoose from "mongoose";

// interface for ticket

export interface ITicket extends mongoose.Document {
  id_owner: string;
  id_client: string;
  id_wakure: string;
  price: number;
  dateFrom: string;
  dateTo: string; //TODO change to moement object
  timeFrom: string; //TODO change to moement object
  timeTo: string; //TODO change to moement object6
  status: string;
}
