"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1["default"])();
        this.port = process.env.PORT || "5000";
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server on port ", _this.port);
        });
    };
    return Server;
}());
exports["default"] = Server;
