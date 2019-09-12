var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, { path: "/socket" });

app.get("/signin", function(req, res) {
  res.sendFile(__dirname + "/assets/signin.html");
});

app.use(express.static("assets"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/assets/chat.html");
});

http.listen(4125, function() {
  console.log("listening on 4125");
});
io.on("connection", function(server) {
  server.on("chat message", function(msg) {
    console.log("message: " + msg);

    server.emit("reply", msg);
  });
});
