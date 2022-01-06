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
exports.authController = void 0;
const roles_enum_1 = require("../helpers/roles_enum");
const user_model_1 = __importDefault(require("../models/user_model"));
const validator_1 = __importDefault(require("../utils/validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    //--------------------------------------------------------------
    //create user / register
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            // validate
            if (!validator_1.default.fieldsCreateUser(body)) {
                res.status(400).json({
                    msg: "name and password are required",
                });
                return;
            }
            if (!validator_1.default.validateLength(body)) {
                res.status(400).json({
                    msg: "name and password must be at least 4 characters",
                });
                return;
            }
            // verify if user exists
            try {
                if (yield validator_1.default.verifyUser(body.name)) {
                    res.status(400).json({
                        msg: "user already exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // verify if email exists
            try {
                if (yield validator_1.default.verifyEmail(body.email)) {
                    res.status(400).json({
                        msg: "email already exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // create user
            const user = {
                name: body.name,
                email: body.email,
                password: body.password,
                role: roles_enum_1.Roles.USER,
                statusDB: true,
            };
            // save user
            try {
                const result = yield user_model_1.default.createUser(user);
                if (result !== null) {
                    // jwt controller
                    const token = jsonwebtoken_1.default.sign({ _id: result._id, role: result.role }, process.env.JWT_SECRET || "", {});
                    res.status(200).header("auth", token).json({ result });
                    return;
                }
            }
            catch (error) {
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    // --------------------------------------------------------------
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            // validate fields
            if (!validator_1.default.fieldsLoginUser(body)) {
                res.status(400).json({
                    msg: "name and password are required",
                });
                return;
            }
            // verify if user exists
            try {
                if (!(yield validator_1.default.verifyUser(body.name))) {
                    res.status(400).json({
                        msg: "user does not exist",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // obtain user
            try {
                const user = yield user_model_1.default.getUserByName(body.name);
                if (user !== null) {
                    // jwt controller
                    const matchPassword = yield user.matchPassword(body.password);
                    if (!matchPassword) {
                        res.status(400).json({
                            msg: "password is incorrect",
                        });
                        return;
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "", { expiresIn: 60 * 60 * 24 });
                        res.status(200).header("auth", token).json({ user });
                        return;
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    // --------------------------------------------------------------
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                msg: "signout",
            });
        });
    }
    // --------------------------------------------------------------
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                msg: "profile",
            });
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=auth_controller.js.map