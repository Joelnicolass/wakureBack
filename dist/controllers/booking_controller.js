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
const user_model_1 = __importDefault(require("../models/user_model"));
const wakure_model_1 = __importDefault(require("../models/wakure_model"));
const moment_1 = __importDefault(require("moment"));
const prepare_info_1 = __importDefault(require("../utils/prepare_info"));
class BookingController {
    verifyAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            // convert dateFrom and timeFrom to datetime moment
            const { dateFrom, dateTo, timeFrom, timeTo } = body;
            const { dateFromMoment, dateToMoment } = convert_timedate_1.default.convertToMoment(dateFrom, dateTo, timeFrom, timeTo);
            // check if dateFrom is before dateTo
            if (dateFromMoment.isAfter(dateToMoment)) {
                res.status(400).json({ msg: "dateFrom is after dateTo" });
                return;
            }
            // check if dateFrom is before now
            if (dateFromMoment.isBefore((0, moment_1.default)())) {
                res.status(400).json({ msg: "dateFrom is before now" });
                return;
            }
            // get info from user
            let user;
            let owner_products_id;
            let tickets;
            let wakureUnavailable = [];
            let wakureAvailable = [];
            try {
                user = yield user_model_1.default.getUserById(body.id_owner);
                if (user !== null) {
                    owner_products_id = user.owner_products_id;
                }
                else {
                    res.status(500).json({ msg: "error" });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // verify if the wakure is available
            owner_products_id = prepare_info_1.default.formatArray(owner_products_id);
            console.log(owner_products_id);
            if (owner_products_id === null) {
                res.status(500).json({ msg: "error" });
                return;
            }
            for (let i = 0; i < owner_products_id.length; i++) {
                try {
                    tickets = yield ticket_model_1.default.getAllTicketsByIdWakure(owner_products_id[i]);
                    if (tickets !== null) {
                        for (let j = 0; j < tickets.length; j++) {
                            const ticket = tickets[j];
                            const { dateFromMoment: ticketDateFromMoment, dateToMoment: ticketDateToMoment, } = convert_timedate_1.default.convertToMoment(ticket.dateFrom, ticket.dateTo, ticket.timeFrom, ticket.timeTo);
                            if (dateFromMoment.isBetween(ticketDateFromMoment, ticketDateToMoment, null, "[]") ||
                                dateToMoment.isBetween(ticketDateFromMoment, ticketDateToMoment, null, "[]")) {
                                if (wakureUnavailable.length === 0) {
                                    wakureUnavailable = [owner_products_id[i]];
                                }
                                else {
                                    wakureUnavailable.push(owner_products_id[i]);
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "error" });
                    return;
                }
            }
            if (wakureUnavailable !== null) {
                wakureAvailable = owner_products_id.filter((id) => !wakureUnavailable.includes(id));
            }
            // get info from wakure
            let wakuresAva;
            try {
                wakuresAva = yield wakure_model_1.default.getWakuresByIds(wakureAvailable);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            let wakuresUnava;
            try {
                wakuresUnava = yield wakure_model_1.default.getWakuresByIds(wakureUnavailable);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // create object to send
            const availability = {
                wakuresAvailable: wakuresAva.map((wakure) => {
                    return {
                        id: wakure.id,
                        name: wakure.name,
                    };
                }),
                wakuresUnavailable: wakuresUnava.map((wakure) => {
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
        });
    }
    createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            // convert dateFrom and timeFrom to datetime moment
            const { dateFrom, dateTo, timeFrom, timeTo } = body;
            const { dateFromMoment, dateToMoment } = convert_timedate_1.default.convertToMoment(dateFrom, dateTo, timeFrom, timeTo);
            // check if dateFrom is before dateTo
            if (dateFromMoment.isAfter(dateToMoment)) {
                res.status(400).json({ msg: "dateFrom is after dateTo" });
                return;
            }
            // check if dateFrom is before now
            if (dateFromMoment.isBefore((0, moment_1.default)())) {
                res.status(400).json({ msg: "dateFrom is before now" });
                return;
            }
            // get info from user
            let user;
            let owner_products_id;
            let tickets;
            let wakureUnavailable = [];
            let wakureAvailable = [];
            try {
                user = yield user_model_1.default.getUserById(body.id_owner);
                if (user !== null) {
                    owner_products_id = user.owner_products_id;
                }
                else {
                    res.status(500).json({ msg: "error" });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // verify if the wakure is available
            owner_products_id = prepare_info_1.default.formatArray(owner_products_id);
            if (owner_products_id === null) {
                res.status(500).json({ msg: "error" });
                return;
            }
            for (let i = 0; i < owner_products_id.length; i++) {
                try {
                    tickets = yield ticket_model_1.default.getAllTicketsByIdWakure(owner_products_id[i]);
                    if (tickets !== null) {
                        for (let j = 0; j < tickets.length; j++) {
                            const ticket = tickets[j];
                            const { dateFromMoment: ticketDateFromMoment, dateToMoment: ticketDateToMoment, } = convert_timedate_1.default.convertToMoment(ticket.dateFrom, ticket.dateTo, ticket.timeFrom, ticket.timeTo);
                            if (dateFromMoment.isBetween(ticketDateFromMoment, ticketDateToMoment, null, "[]") ||
                                dateToMoment.isBetween(ticketDateFromMoment, ticketDateToMoment, null, "[]")) {
                                if (wakureUnavailable.length === 0) {
                                    wakureUnavailable = [owner_products_id[i]];
                                }
                                else {
                                    wakureUnavailable.push(owner_products_id[i]);
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "error" });
                    return;
                }
            }
            if (wakureUnavailable !== null) {
                wakureAvailable = owner_products_id.filter((id) => !wakureUnavailable.includes(id));
            }
            // get info from wakure
            let wakuresAva;
            try {
                wakuresAva = yield wakure_model_1.default.getWakuresByIds(wakureAvailable);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            let wakuresUnava;
            try {
                wakuresUnava = yield wakure_model_1.default.getWakuresByIds(wakureUnavailable);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // create object to send
            const availability = {
                wakuresAvailable: wakuresAva.map((wakure) => {
                    return {
                        id: wakure.id,
                        name: wakure.name,
                    };
                }),
                wakuresUnavailable: wakuresUnava.map((wakure) => {
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
            const newTticket = {
                id_owner: body.id_owner,
                id_client: body.id_client,
                id_wakure: body.id_wakure,
                price: body.price,
                dateFrom: body.dateFrom,
                dateTo: body.dateTo,
                timeFrom: body.timeFrom,
                timeTo: body.timeTo,
                status: ticket_status_enum_1.TicketStatus.PENDING,
            };
            // create ticket in DB
            try {
                const newTicket = yield ticket_model_1.default.createTicket(newTticket);
                if (newTicket !== null) {
                    res.status(200).json(newTticket);
                    // reset arrays
                    wakureUnavailable = [];
                    wakureAvailable = [];
                    wakuresAva = [];
                    wakuresUnava = [];
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
                return;
            }
        });
    }
}
exports.bookingController = new BookingController();
//# sourceMappingURL=booking_controller.js.map