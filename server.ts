require("dotenv").config();
const express = require("express");

import { createServer } from "http";
import { Server } from "socket.io";
import { joinRoomProps, packageDataProps } from "./types/serverTypes";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

// routes
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 8000;

const start = () => {
  try {
    httpServer.listen(port, () => {
      console.log(`Server listenting on port: ${port}...`);
    });
    io.on("connection", (socket) => {
      console.log(`user ${socket.id} connected..`);

      socket.on("join_room", ({ room_id }: joinRoomProps) => {
        socket.join(room_id);
      });

      socket.on("send_message", (packageData: packageDataProps) => {
        socket.to(packageData.room_id).emit("receive_message", packageData);
      });

      socket.on("disconnect", () => {
        console.log(`user ${socket.id} diconnected..`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
