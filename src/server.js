const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer)

const PORT = process.env.PORT ?? 3000;

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

httpServer.listen(PORT, undefined, undefined, () => {
  console.info("Server running on port:", PORT);
});
