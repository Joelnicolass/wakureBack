"use strict";
// validate fields to create user
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
const user_model_1 = __importDefault(require("../models/user_model"));
class Validator {
    // validate fields to create user
    static fieldsCreateUser(body) {
        if (!body.name ||
            !body.password ||
            body.name === "" ||
            body.password === "") {
            return false;
        }
        return true;
    }
    // validate length password and name user
    static validateLength(body) {
        if (body.name.length < 4 || body.password.length < 4) {
            return false;
        }
        return true;
    }
    // validate fields to login user
    static fieldsLoginUser(body) {
        if (!body.name ||
            !body.password ||
            body.name === "" ||
            body.password === "") {
            return false;
        }
        return true;
    }
    // verify if user exists
    static verifyUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getUserByName(name);
                if (user !== null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    // verify if email exists
    static verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getUserByEmail(email);
                if (user !== null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map