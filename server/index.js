const express = require("express");
const cors = require("cors");
const http = require("http"); // <-- FIXED
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const { disconnect } = require("process");

const app = express();
app.use(cors());

const server = http.createServer(app); // now http is defined

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection",(socket)=>{
  console.log(`user connected:  ${socket.id} `); 

  socket.on("send_message",({msg})=>{
    console.log(msg);
    socket.emit("receive_message",msg)
  })
  socket.on("disconnect",()=>{
     console.log(`user disconnected:  ${socket.id} `);
  })
})

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
