const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const UserRouter = require("./routes/users");
const AuthRouter = require("./routes/auth");
const PostRouter = require("./routes/posts");
const cors = require("cors");
const path = require("path");
const multer = require("multer");


dotenv.config();



const PORT = process.env.PORT;

const app = express();


// Allow all domains (or restrict to specific domains as needed)
app.use(cors({
  origin: [
    "https://social-media-bay-three.vercel.app",
    "https://social-media-jypf.onrender.com"
  ]
}));

// Serve static files (images, CSS, JS) from the 'public' folder
app.use('/public', express.static( 'public'));

mongoose.connect(process.env.MONGO_URL, {
},
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// middleweares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/images/person/");
  },
  filename: (req, file, cb) => {
    const safeFileName = req.body.name || `${Date.now()}-${file.originalname}`;
    cb(null, safeFileName);
  },
});


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({ fileName: req.file.filename });
  } catch (err) {
    console.error(err);
  }
})

// setting up APIs

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
