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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose = require("mongoose");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect("mongodb://192.168.1.104:27017/fantest", {});
            console.log("DB connected");
        }
        catch (e) {
            console.log("Error. No connected DB");
            console.log(e);
        }
    });
}
exports.connect = connect;
//# sourceMappingURL=connection.js.map