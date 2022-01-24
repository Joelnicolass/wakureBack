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
exports.bookingController = void 0;
const ticket_status_enum_1 = require("../helpers/ticket_status_enum");
const ticket_model_1 = __importDefault(require("../models/ticket_model"));
const convert_timedate_1 = __importDefault(require("../utils/convert_timedate"));
class BookingController {
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log(body);
            // convert dateFrom and timeFrom to datetime moment
            const { dateFrom, dateTo, timeFrom, timeTo } = body;
            const { dateFromMoment, dateToMoment } = convert_timedate_1.default.convertToMoment(dateFrom, dateTo, timeFrom, timeTo);
            // TODO validate if wakure is available
            // TODO get user
            // TODO get ticket_id
            // TODO get all wakures
            // TODO get all tickets for wakure
            // get tickets when status = pending
            let tickets;
            try {
                tickets = yield ticket_model_1.default.getAllTickets();
                if (tickets !== null && tickets.length > 0) {
                    for (let i = 0; i < tickets.length; i++) {
                        const ticket = tickets[i];
                        // convert dateFrom and timeFrom to datetime moment
                        const { dateFromMoment: ticketDateFromMoment, dateToMoment: ticketDateToMoment, } = convert_timedate_1.default.convertToMoment(ticket.dateFrom, ticket.dateTo, ticket.timeFrom, ticket.timeTo);
                        // check if dateFrom and timeFrom is between ticket dateFrom and timeFrom and ticket dateTo and timeTo
                        if (dateFromMoment.isBetween(ticketDateFromMoment, ticketDateToMoment, null, "[]")) {
                            res.status(400).json({
                                msg: "Wakure is not available at this time",
                            });
                            return;
                        }
                    }
                    console.log("esta disponible");
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // create ticket object
            const ticket = {
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
                status: ticket_status_enum_1.TicketStatus.PENDING,
            };
            // create ticket in DB
            try {
                const newTicket = yield ticket_model_1.default.createTicket(ticket);
                if (newTicket !== null) {
                    res.status(200).json({ ticket });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.bookingController = new BookingController();
//# sourceMappingURL=booking_controller.js.map