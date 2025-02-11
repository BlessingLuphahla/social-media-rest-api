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
    !users.some((user) => user.userId == userId) &&
      users.push({
        userId,
        socketId,
      });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    const socketId = socket.id;

    socket.on("sendUser", (userId) => {
      addUser(userId, socketId);
      io.emit("getUsers", users);
    });

    socket.on("disconnect", (socket) => {
      console.log(" a user has disconnected");
      removeUser(socket.id);
    });
  });

  return io;
};

const getSocketInstance = () => io;

module.exports = { initializeSocket, getSocketInstance };
