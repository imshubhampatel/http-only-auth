module.exports.chatSockets = function (chatServer) {
  let io = require("socket.io")(chatServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", function (socket) {
    console.log("new connection established", socket.id);
    socket.on("chat", (message) => {
      console.log("mesg", message);
      io.emit("chat", message);
    });
  });
};
