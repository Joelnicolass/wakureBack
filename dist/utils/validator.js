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
const wakure_model_1 = __importDefault(require("../models/wakure_model"));
class Validator {
    // validate fields to create user
    static fieldsCreateUser(body) {
        if (!body.name ||
            !body.surname ||
            !body.address ||
            !body.phone ||
            !body.email ||
            !body.password ||
            body.name === "" ||
            body.password === "" ||
            body.surname === "" ||
            body.address === "" ||
            body.phone === "" ||
            body.email === "") {
            return false;
        }
        return true;
    }
    // validate length password
    static validateLength(body) {
        if (body.password.length < 6) {
            return false;
        }
        return true;
    }
    // validate fields to login user
    static fieldsLoginUser(body) {
        if (!body.email ||
            !body.password ||
            body.email === "" ||
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
                console.log(name);
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
    // verify if user exist by id
    static verifyUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getUserById(id);
                console.log(user);
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
    // verify if user exist and verify if is owner
    static verifyUserAndOwner(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getUserById(id);
                if (user !== null) {
                    if (user.role === "OWNER") {
                        return user;
                    }
                    else {
                        return false;
                    }
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
    //WAKURE VALIDATORS --------------------------------
    //validate fields create wakure
    static fieldsCreateWakure(body) {
        if (!body.name || !body.id || body.name === "" || body.id === "") {
            return false;
        }
        return true;
    }
    //verify if wakure exists
    static verifyWakure(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wakure = yield wakure_model_1.default.getWakureById(id);
                if (wakure !== null) {
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
    //validate if wakure exists and if it has owner
    static verifyWakureAndOwner(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wakure = yield wakure_model_1.default.getWakureById(id);
                if (wakure !== null) {
                    if (wakure.hasOwner) {
                        return false;
                    }
                    else {
                        return true;
                    }
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
    //validate if wakure exists and if it has owner
    static verifyWakureHasNotOwner(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wakure = yield wakure_model_1.default.getWakureById(id);
                if (wakure !== null) {
                    if (wakure.hasOwner) {
                        return true;
                    }
                    else {
                        return false;
                    }
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