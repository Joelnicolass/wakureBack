"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrepareInfo {
    static formatFriends(friends) {
        if (friends !== null) {
            if (friends !== undefined) {
                if (friends[0] === "") {
                    friends = friends.shift();
                }
                return friends;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}
exports.default = PrepareInfo;
//# sourceMappingURL=prepare_info_friends.js.map