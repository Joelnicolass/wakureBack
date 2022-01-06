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
exports.wakureController = void 0;
const wakure_model_1 = __importDefault(require("../models/wakure_model"));
const validator_1 = __importDefault(require("../utils/validator"));
class WakureController {
    // add wakure
    addWakure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            // validate
            if (!validator_1.default.fieldsCreateWakure(body)) {
                res.status(400).json({
                    msg: "name and description are required",
                });
                return;
            }
            // verify if wakure exists
            if (yield validator_1.default.verifyWakure(body.id)) {
                res.status(400).json({
                    msg: "wakure already exists",
                });
                return;
            }
            // create wakure
            try {
                // create object wakure
                const wakure = {
                    id: body.id,
                    name: body.name,
                    geolocation: {
                        lat: -27.37008,
                        lng: -55.99201,
                    },
                    booking: false,
                    statusDB: true,
                };
                const result = yield wakure_model_1.default.addWakure(wakure);
                if (result !== null) {
                    res.status(200).json(result);
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
    // update geolocation wakure
    updateGeolocationWakure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { id } = req.params;
            //TODO validate
            // verify if wakure exists
            if (!(yield validator_1.default.verifyWakure(id))) {
                res.status(400).json({
                    msg: "wakure does not exists",
                });
                return;
            }
            // get wakure by id
            let wakure;
            try {
                wakure = yield wakure_model_1.default.getWakureById(id);
                if (wakure == null) {
                    res.status(400).json({
                        msg: "wakure does not exists",
                    });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "error" });
                return;
            }
            // create object wakure
            wakure = {
                id: id,
                name: wakure.name,
                geolocation: {
                    lat: body.lat,
                    lng: body.lng,
                },
                booking: wakure.booking,
                statusDB: wakure.statusDB,
            };
            // update geolocation wakure
            try {
                const result = yield wakure_model_1.default.updateGeolocationWakure(wakure);
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
    // get geolocation wakure
    getGeolocationWakure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            // verify if wakure exists
            if (!(yield validator_1.default.verifyWakure(id))) {
                res.status(400).json({
                    msg: "wakure does not exists",
                });
                return;
            }
            // get wakure by id
            try {
                const wakure = yield wakure_model_1.default.getWakureById(id);
                if (wakure !== null) {
                    res.status(200).json(wakure);
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
exports.wakureController = new WakureController();
//# sourceMappingURL=wakure_controller.js.map