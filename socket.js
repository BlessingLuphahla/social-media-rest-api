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

  let users = [];

  const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId });
    }
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => users.find((user) => user.userId === userId);

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("sendUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("getMessage", { senderId, text });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  return io;
};

const getSocketInstance = () => io;

module.exports = { initializeSocket, getSocketInstance };
