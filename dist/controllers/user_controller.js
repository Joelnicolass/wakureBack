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
const roles_enum_1 = require("../helpers/roles_enum");
const user_model_1 = __importDefault(require("../models/user_model"));
const wakure_model_1 = __importDefault(require("../models/wakure_model"));
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
    // get my wakures
    getMyWakures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("getMyWakures from controller db");
            //validate if user exists
            let user;
            try {
                user = yield user_model_1.default.getUserById(id);
                if (!user) {
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
            console.log(user.owner_products_id);
            // get wakures
            try {
                const wakures = yield wakure_model_1.default.getWakuresByIds(user.owner_products_id);
                if (wakures !== null) {
                    res.status(200).json(wakures);
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
    // add wakure to owner_products_id
    addWakureToOwnerProductsId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // id params = id user
            // body.id = id wakure
            // body.name = name wakure
            const { id } = req.params;
            const { body } = req;
            //validates
            // verify if user exist
            let user;
            try {
                user = yield user_model_1.default.getUserById(id);
                if (!user) {
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
            //validate if wakure exists and if it has owner
            try {
                const wakure = yield validator_1.default.verifyWakureAndOwner(body.id);
                if (!wakure) {
                    res.status(400).json({
                        msg: "wakure does not exist or it has not owner",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // update name and hasOwner wakure
            try {
                const wakure = yield wakure_model_1.default.updateNameAndHasOwnerWakure(body.name, true, body.id);
                if (wakure !== null) {
                    // add wakure to owner_products_id
                    const user = yield user_model_1.default.addWakureToOwnerProductsId(id, body.id);
                    if (user !== null) {
                        if (user.owner_products_id.length >= 2) {
                            //update role to owner
                            const user = yield user_model_1.default.updateRole(id, roles_enum_1.Roles.OWNER);
                        }
                        res.status(200).json({
                            msg: "wakure added",
                        });
                        return;
                    }
                    else {
                        res.status(500).json({
                            msg: "error",
                        });
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
    // delete wakure from owner_products_id
    deleteWakureFromOwnerProductsId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // id params = id user
            const { id, code } = req.params;
            //validates
            // verify if user exist
            try {
                if (!(yield validator_1.default.verifyUserById(id))) {
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
            //validate if wakure exists and if it has owner
            try {
                const wakure = yield validator_1.default.verifyWakureHasNotOwner(code);
                if (!wakure) {
                    res.status(400).json({
                        msg: "wakure does not exist or it has owner",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // delete wakure from owner_products_id
            try {
                const user = yield user_model_1.default.deleteWakureFromOwnerProductsId(id, code);
                if (user !== null) {
                    // update role to user
                    if (user.owner_products_id.length === 1) {
                        const user = yield user_model_1.default.updateRole(id, roles_enum_1.Roles.CLIENT);
                    }
                    // update name and hasOwner wakure
                    const wakure = yield wakure_model_1.default.updateNameAndHasOwnerWakure("WAKURE FANIOT", false, code);
                    res.status(200).json({
                        msg: "wakure deleted",
                    });
                    return;
                }
                else {
                    res.status(500).json({
                        msg: "error",
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
    // upload Wakure Name by Id
    updateWakureNameById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, code } = req.params;
            const { body } = req;
            // verify if wakure exists
            if (!(yield validator_1.default.verifyWakure(code))) {
                res.status(400).json({
                    msg: "wakure does not exists",
                });
                return;
            }
            //TODO verify user exist and has owner
            // update name wakure
            try {
                const result = yield wakure_model_1.default.updateNameWakure(code, body.name);
                if (result !== null) {
                    res.status(200).json(result);
                    return;
                }
                console.log(result + " updated");
                res.status(500).json({ msg: "Algo pasó" });
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