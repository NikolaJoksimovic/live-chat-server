"use strict";
exports.__esModule = true;
require("dotenv").config();
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*"
    }
});
app.use(express.json());
// routes
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
var port = process.env.PORT || 8000;
var start = function () {
    try {
        httpServer.listen(port, function () {
            console.log("Server listenting on port: ".concat(port, "..."));
        });
        io.on("connection", function (socket) {
            console.log("user ".concat(socket.id, " connected.."));
            socket.on("join_room", function (_a) {
                var room_id = _a.room_id;
                socket.join(room_id);
            });
            socket.on("send_message", function (packageData) {
                socket.to(packageData.room_id).emit("receive_message", packageData);
            });
            socket.on("disconnect", function () {
                console.log("user ".concat(socket.id, " diconnected.."));
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
