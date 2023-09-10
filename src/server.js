import { Server } from "socket.io";

const PORT = process.env.PORT ?? 3000;

const io = new Server();

io.on("connection", (socket) => {
  console.log("connected", socket);
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});
io.listen(3000);
