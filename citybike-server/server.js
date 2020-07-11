const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";
const {} = require("./helpers");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIO(server);

let interval;

io.on("connection", (socket) => {
  // Connection Data
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log("New connection " + socketId + " from " + clientIp);

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    getDataAndEmit(socket, citybikeurl);
  }, 6000);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socketId);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
