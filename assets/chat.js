$(document).ready(() => {
  var client = io("wss://pixie.jubi.ai", {
    path: "/chat/socket",
    transports: ["websocket"]
  });
  client.on("reply", function(msg) {
    $("#server_text").text(msg);
  });
  $("form").submit(function(e) {
    e.preventDefault(); // prevents page reloading
    client.emit("chat message", $("#m").val());
    $("#client_text").text($("#m").val());
    $("#m").val("");
    return false;
  });
});
