$(document).ready(() => {
  (async () => {
    let checkin = await pixieapi.checkLogin();
    if (checkin.status == "success") {
      $("#signedin-div").show();
      $("#loading-div").hide();
      return;
    }
    window.location.replace("https://pixie.jubi.ai/");
  })();

  var client = io("https://pixie.jubi.ai", {
    path: "/chat/socket"
  });
  client.on("chat-to-client", function(msg) {
    //to display received message - to push left message
    $("#messages").append('<li class="left-chat"><p>' + msg + "</p></li>");
  });

  $("#chat-send").click(() => {
    let message = $("#chat-input").val();
    setTimeout(function() {
      client.emit("chat-to-server", message);
    }, 5000);

    $("#chat-input").val("");
    //to display sent message- to push right message
    $("#messages").append('<li class="right-chat"><p>' + message + "</p></li>");
  });

  $("#logout").click(async () => {
    await pixieapi.logout();
    window.location.replace("https://pixie.jubi.ai/");
  });
});
