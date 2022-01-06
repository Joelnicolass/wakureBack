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
exports.userController = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const validator_1 = __importDefault(require("../utils/validator"));
//get -----------------------------------------------------
class UserController {
    // get all users with statusDB = true
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.getAllUsers();
                if (users !== null) {
                    res.status(200).json(users);
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    // get user by name
    getUserByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            try {
                const user = yield user_model_1.default.getUserByName(name);
                if (user !== null) {
                    res.status(200).json(user);
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    // post -----------------------------------------------------
    // put -----------------------------------------------------
    updatePassword(req, res) {
        const { name } = req.params;
        const { body } = req;
    }
    // delete -----------------------------------------------------
    // delete user by name
    deleteUserByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            //validate if user exists
            try {
                if (!(yield validator_1.default.verifyUser(name))) {
                    res.status(400).json({
                        msg: "user not exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // delete user
            try {
                if (yield user_model_1.default.deleteUserByName(name)) {
                    res.status(200).json({
                        msg: "user deleted",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user_controller.js.map