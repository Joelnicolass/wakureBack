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
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("../routes/user_router"));
const auth_router_1 = __importDefault(require("../routes/auth_router"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../db/connection");
const token_handler_1 = require("../utils/token_handler");
// class server --------------------------------------
class Server {
    constructor() {
        this._ApiPaths = {
            auth: "/api/auth",
            users: "/api/users",
        };
        this._app = (0, express_1.default)();
        this._port = process.env.PORT || "5000";
        // init methods -----------------------------------
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // methods ------------------------------------------
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connection_1.connect)();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // middlewares
    middlewares() {
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json());
    }
    // routes
    routes() {
        this._app.use(this._ApiPaths.auth, auth_router_1.default);
        this._app.use(this._ApiPaths.users, token_handler_1.tokenValidator, user_router_1.default);
    }
    // server on
    listen() {
        this._app.listen(this._port, () => {
            console.log("Server on port", this._port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map