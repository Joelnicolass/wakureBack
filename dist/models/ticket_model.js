"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_schema_1 = __importDefault(require("../models/schemas/ticket_schema"));
class TicketModel {
    // create ticket
    static createTicket(ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTicket = new ticket_schema_1.default({
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
                return yield newTicket.save();
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get all tickets when status = pending
    static getAllTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_schema_1.default.find({ status: "PENDING" });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get all tickets when status = PENDING and id_owner = id_owner
    static getAllTicketsByIdOwner(id_owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_schema_1.default.find({ status: "PENDING", id_owner });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    /*   public static async getTicketsByIdWakure(
      products_id: string[]
    ): Promise<ITicket[] | null> {
      try {
        return await Ticket.find({
          status: "PENDING",
          id_wakure: { $in: products_id },
        });
      } catch (error) {
        console.log(error);
      }
      return null;
    }
   */
    static getAllTicketsByIdWakure(id_wakure) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_schema_1.default.find({ status: "PENDING", id_wakure });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
}
exports.default = TicketModel;
//# sourceMappingURL=ticket_model.js.map