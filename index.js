const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const UserRouter = require("./routes/users");
const AuthRouter = require("./routes/auth");
const PostRouter = require("./routes/posts");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

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
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

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
