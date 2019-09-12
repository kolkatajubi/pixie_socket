var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/signin", function(req, res) {
  res.sendFile(__dirname + "/assets/signin.html");
});

app.use(express.static("assets"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/assets/chat.html");
});

http.listen(4125, function() {
  console.log("listening on *:3000");
});
io.on("connection", function(server) {
  server.on("chat message", function(msg) {
    console.log("message: " + msg);

    server.emit("reply", msg);
  });
});