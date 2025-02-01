const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
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
