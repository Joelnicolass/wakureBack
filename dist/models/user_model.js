"use strict";
// model for user using mongoose
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
const user_schema_1 = __importDefault(require("./schemas/user_schema"));
class UserModel {
    // create user
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new user_schema_1.default({
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    statusDB: true,
                });
                newUser.password = yield newUser.encryptPassword(user.password);
                return yield newUser.save();
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get user by name and statysDB = true
    static getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.findOne({ name, statusDB: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get user by email and statysDB = true
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.findOne({ email, statusDB: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get all users with statusDB = true
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.find({ statusDB: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // update password
    static updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.findOneAndUpdate({ name: user.name }, { password: user.password }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // delete user by name
    static deleteUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.findOneAndDelete({ name });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
}
exports.default = UserModel;
//# sourceMappingURL=user_model.js.map