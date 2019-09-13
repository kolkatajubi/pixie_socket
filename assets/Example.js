//On the client side
var client = io("https://pixie.jubi.ai", {
  path: "/chat/socket"
});

//client is listening to 'chat-to-client' socket
client.on("chat-to-client", function(msg) {
  //client is sending message to 'chat-to-server' socked
  client.emit("chat-to-server", message);
});







//On the server side
var http = require("http").createServer(app);

//importing the socket.io library
var io = require("socket.io")(http, {
  path: "/socket"
});

//client is listening to 'chat-to-server' socket
server.on("chat-to-server", function(msg) {
  console.log("message: " + msg);

  //sending message to "chat-to-client" socket
  server.emit("chat-to-client", msg);
});
