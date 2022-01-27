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
exports.friendsController = void 0;
const roles_enum_1 = require("../helpers/roles_enum");
const user_model_1 = __importDefault(require("../models/user_model"));
const validator_1 = __importDefault(require("../utils/validator"));
class FriendsController {
    // add friend ----------------------------------------------------------
    sendRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { friend_id } = req.body;
            const { id } = req.params;
            let user;
            // verify if user exist
            try {
                user = yield user_model_1.default.getUserById(id);
                if (!user) {
                    res.status(400).json({
                        msg: "user not exists",
                    });
                    return;
                }
                // verify if already friend
                if (user.friends_id.includes(friend_id)) {
                    res.status(400).json({
                        msg: "friend already exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            try {
                if (!(yield validator_1.default.verifyUserById(friend_id))) {
                    res.status(400).json({
                        msg: "friend not exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // save friend
            //TODO SEND SOLICITATION TO FRIEND
            try {
                const user = yield user_model_1.default.addUserToFriendsId(id, friend_id);
                res.status(200).json({ user });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    quickAddFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, surname, email, address, phone } = req.body;
            const { id } = req.params;
            console.log(name, surname, email, address, phone);
            let owner;
            let friend;
            // verify if user exist
            try {
                owner = yield user_model_1.default.getUserById(id);
                if (!owner) {
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
            // create object user for friend\
            //TODO generate aleatory password
            let password;
            friend = {
                name: name,
                surname: surname,
                address: address,
                phone: phone,
                email: email,
                password: "WAKURECLIENT",
                role: roles_enum_1.Roles.CLIENT,
                owner_products_id: [""],
                client_products_id: [""],
                ticket_id: [""],
                friends_id: [""],
                statusDB: true,
            };
            // create user
            try {
                friend = yield user_model_1.default.createUser(friend);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // save friend
            try {
                const owner = yield user_model_1.default.addUserToFriendsId(id, friend === null || friend === void 0 ? void 0 : friend.id);
                res.status(200).json({ owner });
                // TODO send email
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    // delete friend ----------------------------------------------------------
    deleteFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { friend_id } = req.body;
            const { id } = req.params;
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
            try {
                if (!(yield validator_1.default.verifyUserById(friend_id))) {
                    res.status(400).json({
                        msg: "friend not exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            try {
                const user = yield user_model_1.default.deleteUserFromFriendsId(id, friend_id);
                res.status(200).json({ user });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
    // get friends ----------------------------------------------------------
    getFriends(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let user;
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
            try {
                // get user info
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
            // get friends from user
            const friends = user === null || user === void 0 ? void 0 : user.friends_id;
            // prepare info
            if (friends !== undefined) {
                if (friends[0] === "") {
                    friends.shift();
                }
                if (friends.length === 0) {
                    res.status(400).json({
                        msg: "no friends",
                    });
                    return;
                }
            }
            try {
                const friends_info = yield user_model_1.default.getUsersByIds(friends);
                res.status(200).json(friends_info);
                return;
            }
            catch (error) { }
            res.status(400).json({
                msg: "no friends",
            });
            return;
        });
    }
    // get friend by id ----------------------------------------------------------
    getFriendById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { friend_id } = req.body;
            console.log(friend_id);
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
            try {
                if (!(yield validator_1.default.verifyUserById(friend_id))) {
                    res.status(400).json({
                        msg: "friend not exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            try {
                const user = yield user_model_1.default.getUserById(friend_id);
                res.status(200).json({ user });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
        });
    }
}
exports.friendsController = new FriendsController();
//# sourceMappingURL=friends_controller.js.map