"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ticketSchema = new mongoose_1.default.Schema({
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
    paymentLink: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Ticket", ticketSchema);
//# sourceMappingURL=ticket_schema.js.map