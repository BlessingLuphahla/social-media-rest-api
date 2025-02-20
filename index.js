const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { createServer } = require("http");
const { initializeSocket } = require("./socket");

const cloudinary = require("./cloudinary");

const UserRouter = require("./routes/users");
const AuthRouter = require("./routes/auth");
const PostRouter = require("./routes/posts");
const ConversationRouter = require("./routes/conversations");
const MessageRouter = require("./routes/messages");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: [
      "https://social-media-bay-three.vercel.app",
      "https://social-media-jypf.onrender.com",
      process.env.LOCAL_REACT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and authentication headers
  })
);

// Serve static files (images, CSS, JS) from the 'public' folder
app.use("/public", express.static("public"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Setting up APIs
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostRouter);
app.use("/api/conversations", ConversationRouter);
app.use("/api/messages", MessageRouter);

// Initialize Socket.io
const server = createServer(app);
initializeSocket(server);

// Start the socket server
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send(
    "Wassup i am Redd Axe \n This is an API the UI logic is implimented seperated"
  );
});

// Multer configuration for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 10MB
});

// Middleware to parse form-data (needed for handling file uploads)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "images",
      resource_type: "auto",
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});
