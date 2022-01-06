"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wakureSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    geolocation: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    booking: {
        type: Boolean,
        required: true,
    },
    statusDB: {
        type: Boolean,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Wakure", wakureSchema);
//# sourceMappingURL=wakure_schema.js.map