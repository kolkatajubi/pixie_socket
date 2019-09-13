var express = require("express");
var app = express();
var http = require("http").createServer(app);
let users = [];
var io = require("socket.io")(http, {
  path: "/socket"
});

app.use(express.static("assets"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/assets/chat.html");
});

http.listen(4125, function() {
  console.log("listening on 4125");
});

io.on("connection", socket => {
  console.log(users);
  //users.push({ id: socket.id, object: socket });

  io.on("chat-to-server", data => {
    console.log(data);
    if (users.length > 0) io.emit("chat-to-client", data);
  });
});

// io.on("connection", function(server) {
//   server.on("chat-to-server", function(msg) {
//     console.log("message: " + msg);
//     server.emit("chat-to-client", msg);
//   });
// });
