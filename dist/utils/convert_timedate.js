"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class ConvertDateTimeToMoment {
    static convertToMoment(dateFrom, dateTo, timeFrom, timeTo) {
        // convert dateFrom and timeFrom to datetime moment
        const dateFromMoment = (0, moment_1.default)(dateFrom + " " + timeFrom, "YYYY-MM-DD HH:mm");
        // convert dateTo and timeTo to datetime moment
        const dateToMoment = (0, moment_1.default)(dateTo + " " + timeTo, "YYYY-MM-DD HH:mm");
        return { dateFromMoment, dateToMoment };
    }
}
exports.default = ConvertDateTimeToMoment;
//# sourceMappingURL=convert_timedate.js.map