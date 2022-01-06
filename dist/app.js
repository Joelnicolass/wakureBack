"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server/server"));
dotenv_1.default.config();
// create server
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map