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
const wakure_schema_1 = __importDefault(require("./schemas/wakure_schema"));
class WakureModel {
    // add wakure
    static addWakure(wakure) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newWakure = new wakure_schema_1.default({
                    id: wakure.id,
                    name: wakure.name,
                    geolocation: wakure.geolocation,
                    hasOwner: wakure.hasOwner,
                    availablesDays: wakure.availablesDays,
                    statusDB: true,
                });
                return yield newWakure.save();
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get wakure by id
    static getWakureById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOne({ id, statusDB: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get all wakures with statusDB = true
    static getAllWakures() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.find({ statusDB: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // get all wakures where id is in array
    static getWakuresByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(ids);
                return yield wakure_schema_1.default.find({ id: { $in: ids }, statusDB: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // delete wakure by id
    static deleteWakureById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOneAndUpdate({ id }, { statusDB: false });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    //update geolocation wakure
    static updateGeolocationWakure(wakure) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOneAndUpdate({ id: wakure.id }, { geolocation: wakure.geolocation }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // update name wakure
    static updateNameWakure(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOneAndUpdate({ id: id }, { name: name }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // update hasOwner wakure
    static updateHasOwnerWakure(owner, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOneAndUpdate({ id: id }, { hasOwner: owner }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // update name and hasOwner wakure
    static updateNameAndHasOwnerWakure(name, owner, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOneAndUpdate({ id: id }, { name: name, hasOwner: owner }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    // update availablesDays wakure
    static updateAvailablesDaysWakure(availablesDays, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield wakure_schema_1.default.findOneAndUpdate({ id: id }, { availablesDays: availablesDays }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
}
exports.default = WakureModel;
//# sourceMappingURL=wakure_model.js.map