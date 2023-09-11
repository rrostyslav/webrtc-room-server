import { Server } from "socket.io";

const { PORT, CORS_ORIGIN } = process.env;

const io = new Server({
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});
io.listen(PORT);
