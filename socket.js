const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "https://social-media-bay-three.vercel.app",
        "https://social-media-jypf.onrender.com",
        "http://localhost:3204",
      ],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
      io.emit("receiveMessage", { senderId, receiverId, text });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

const getSocketInstance = () => io;

module.exports = { initializeSocket, getSocketInstance };
