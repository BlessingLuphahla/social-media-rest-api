const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save().then(() => {
      res.status(200).json("User has been created");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/login", (req, res) => {
//   res.send("Login");
// });

module.exports = router;
