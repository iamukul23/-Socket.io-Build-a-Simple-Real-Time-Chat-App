const express = require("express");
const cors = require("cors");
const http = require("http"); // <-- FIXED
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app); // now http is defined

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
