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
const booking_process_1 = __importDefault(require("../utils/booking_process"));
class BookingController {
    verifyAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { id } = req.params;
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
            let daysBooking = [];
            // get all days between dateFrom and dateTo
            for (let i = dateFromMoment; i.isBefore(dateToMoment); i.add(1, "days")) {
                daysBooking.push(i.day());
            }
            // get info from user
            let user;
            let owner_products_id;
            let tickets;
            let wakureUnavailableIds = [];
            let wakureAvailableIds = [];
            try {
                user = yield user_model_1.default.getUserById(id);
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
                                if (wakureUnavailableIds.length === 0) {
                                    wakureUnavailableIds = [owner_products_id[i]];
                                }
                                else {
                                    wakureUnavailableIds.push(owner_products_id[i]);
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
            if (wakureUnavailableIds !== null) {
                wakureAvailableIds = owner_products_id.filter((id) => !wakureUnavailableIds.includes(id));
            }
            // get info from wakure
            let wakuresAvailableObjects;
            let filterDays = [];
            let daysUnavailable;
            try {
                wakuresAvailableObjects = yield wakure_model_1.default.getWakuresByIds(wakureAvailableIds);
                if (wakuresAvailableObjects !== null) {
                    filterDays = booking_process_1.default.getWakureIdWithFilterDays(wakuresAvailableObjects, daysBooking);
                }
                wakureUnavailableIds.push(...filterDays);
                // check if wakure is available
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            let wakureUnavailableObjects;
            try {
                wakureUnavailableObjects = yield wakure_model_1.default.getWakuresByIds(wakureUnavailableIds);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // apply filter days
            wakuresAvailableObjects = wakuresAvailableObjects.filter((wakure) => !wakureUnavailableIds.includes(wakure.id));
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
        });
    }
    createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { id } = req.params;
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
            let daysBooking = [];
            // get all days between dateFrom and dateTo
            for (let i = dateFromMoment; i.isBefore(dateToMoment); i.add(1, "days")) {
                daysBooking.push(i.day());
            }
            // get info from user
            let user;
            let owner_products_id;
            let tickets;
            let wakureUnavailableIds = [];
            let wakureAvailableIds = [];
            try {
                user = yield user_model_1.default.getUserById(id);
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
                                if (wakureUnavailableIds.length === 0) {
                                    wakureUnavailableIds = [owner_products_id[i]];
                                }
                                else {
                                    wakureUnavailableIds.push(owner_products_id[i]);
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
            if (wakureUnavailableIds !== null) {
                wakureAvailableIds = owner_products_id.filter((id) => !wakureUnavailableIds.includes(id));
            }
            // get info from wakure
            let wakuresAvailableObjects;
            let filterDays = [];
            let daysUnavailable;
            try {
                wakuresAvailableObjects = yield wakure_model_1.default.getWakuresByIds(wakureAvailableIds);
                if (wakuresAvailableObjects !== null) {
                    filterDays = booking_process_1.default.getWakureIdWithFilterDays(wakuresAvailableObjects, daysBooking);
                }
                wakureUnavailableIds.push(...filterDays);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            let wakuresUnavailableObjects;
            try {
                wakuresUnavailableObjects = yield wakure_model_1.default.getWakuresByIds(wakureUnavailableIds);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // apply filter days
            wakuresAvailableObjects = wakuresAvailableObjects.filter((wakure) => !wakureUnavailableIds.includes(wakure.id));
            // create object to send
            const availability = {
                wakuresAvailable: wakuresAvailableObjects.map((wakure) => {
                    return {
                        id: wakure.id,
                        name: wakure.name,
                    };
                }),
                wakuresUnavailable: wakuresUnavailableObjects.map((wakure) => {
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
            let price;
            try {
                price = parseInt(body.price);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // create ticket object
            const newTicket = {
                id_owner: id,
                id_client: body.id_client,
                id_wakure: body.id_wakure,
                price: price,
                dateFrom: body.dateFrom,
                dateTo: body.dateTo,
                timeFrom: body.timeFrom,
                timeTo: body.timeTo,
                status: ticket_status_enum_1.TicketStatus.PENDING,
            };
            console.log(newTicket);
            // create ticket in DB
            try {
                const newTicketSave = yield ticket_model_1.default.createTicket(newTicket);
                if (newTicketSave !== null) {
                    res.status(200).json(newTicketSave);
                    // reset arrays
                    wakureUnavailableIds = [];
                    wakureAvailableIds = [];
                    wakuresAvailableObjects = [];
                    wakuresUnavailableObjects = [];
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
    // update ticket status
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // id
            // status
            // id_ticket
            const { body } = req;
            const { id } = req.params;
            // get ticket
            let ticket;
            try {
                ticket = yield ticket_model_1.default.getTicketById(body.id_ticket);
            }
            catch (error) {
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
                const newTicket = yield ticket_model_1.default.updateStatus(body.id_ticket, body.status);
                res.status(200).json(newTicket);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
                return;
            }
        });
    }
    // get all tickets by id_owner and status = PENDING
    getAllTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let tickets;
            try {
                tickets = yield ticket_model_1.default.getAllTicketsByIdOwner(id);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            if (tickets === null) {
                res.status(400).json({ msg: "ticket not found" });
                return;
            }
            res.status(200).json(tickets);
        });
    }
    // update wakure available days
    updateWakureAvailableDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { days, wakureId } = req.body;
            const { id } = req.params;
            // get wakure
            let wakure;
            try {
                wakure = yield wakure_model_1.default.getWakureById(wakureId);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            if (wakure === null) {
                res.status(400).json({ msg: "wakure not found" });
                return;
            }
            // get user info
            let user;
            try {
                user = yield user_model_1.default.getUserById(id);
            }
            catch (error) {
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
            days;
            console.log(days);
            // update wakure available days
            try {
                const newWakure = yield wakure_model_1.default.updateAvailablesDaysWakure(days, wakureId);
                res.status(200).json(newWakure);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
                return;
            }
        });
    }
    // get available days wakure
    getWakureAvailableDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { wakureId } = req.body;
            // check if user is the owner of the wakure
            let wakure;
            try {
                wakure = yield wakure_model_1.default.getWakureById(wakureId);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            if (wakure === null) {
                res.status(400).json({ msg: "wakure not found" });
                return;
            }
            // get user info
            let user;
            try {
                user = yield user_model_1.default.getUserById(id);
            }
            catch (error) {
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
        });
    }
}
exports.bookingController = new BookingController();
//# sourceMappingURL=booking_controller.js.map