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

  let users = new Map();

  const addUser = (userId, socketId) => {
    if (!users.has(userId)) {
      users.set(userId, socketId);
    }
  };

  const removeUser = (socketId) => {
    for (const [userId, socket] of users) {
      if (socket === socketId) {
        users.delete(userId);
        break;
      }
    }
  };

  const getUser = (userId) => users.get(userId);
  io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    const socketId = socket.id;

    socket.on("sendUser", (userId) => {
      addUser(userId, socketId);
      console.log("send userId: ", userId);

      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        socket.to(receiver.socketId).emit("getMessage", { senderId, text });
      }
    });

    socket.on("disconnect", () => {
      console.log(" a user has disconnected");
      removeUser(socket.id);
    });
  });

  return io;
};

const getSocketInstance = () => io;

module.exports = { initializeSocket, getSocketInstance };
