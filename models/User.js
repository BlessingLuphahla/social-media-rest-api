const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
      default: "Unknown",
    },
    from: {
      type: String,
      max: 50,
      default: "Unknown",
    },
    relationship: {
      type: String,
      default: "Unknown",
    },
    posts: {
      type: Array,
      default: [],
    },
    savedPosts: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
