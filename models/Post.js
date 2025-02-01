const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  img: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
