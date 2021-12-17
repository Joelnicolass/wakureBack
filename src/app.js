"use strict";
exports.__esModule = true;
// import dotenv
var dotenv_1 = require("dotenv");
var server_1 = require("./server/server");
dotenv_1["default"].config();
// create server
var server = new server_1["default"]();
server.listen();
