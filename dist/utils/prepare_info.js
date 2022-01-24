"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrepareInfo {
    static formatArray(array) {
        // validate if array is empty
        if (array === null) {
            return null;
        }
        else {
            // validate if array have first element === ""
            if (array[0] === "") {
                // remove first element
                array.shift();
                return array;
            }
            else {
                return array;
            }
        }
    }
}
exports.default = PrepareInfo;
//# sourceMappingURL=prepare_info.js.map