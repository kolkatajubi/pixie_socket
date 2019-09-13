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
  client.on("chat-to-client", function(data) {
    console.log("MESAAGE"+JSON.stringify(data))
    if (data.from != localStorage.getItem("username")) {
      
      try {
      console.log("MESSAGE RECIVED" + JSON.stringify(data.message_content));
      $("#messages").append(
        '<li class="left-chat"><p>' + data.message_content + "</p></li>"
      );
} catch(e){
	console.log(e)
}
    }
    //to display received message - to push left message
  });

  $("#chat-send").click(() => {
    let message = $("#chat-input").val();
    client.emit("chat-to-server", {
      from: localStorage.getItem("username"),
      message_content: message
    });

    // setTimeout(function() {
    //   client.emit("chat-to-server", message);
    // }, 5000);

    $("#chat-input").val("");
    //to display sent message- to push right message
    $("#messages").append('<li class="right-chat"><p>' + message + "</p></li>");
  });

  $("#logout").click(async () => {
    await pixieapi.logout();
    window.location.replace("https://pixie.jubi.ai/");
  });
});
