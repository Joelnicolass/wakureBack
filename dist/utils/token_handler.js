"use strict";
// token validator middleware
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidator = (req, res, next) => {
    // get token from header
    const token = req.header("auth");
    // check if token exists
    if (!token) {
        res.status(401).json({ msg: "token not found" });
        return;
    }
    // verify token
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
    }
    catch (error) {
        res.status(401).json({ msg: "token is not valid" });
        return;
    }
    next();
};
exports.tokenValidator = tokenValidator;
//# sourceMappingURL=token_handler.js.map