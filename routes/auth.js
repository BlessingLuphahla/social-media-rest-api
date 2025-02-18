const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const validateEmail = (email) =>
  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json("All fields (username, email, password) are required.");
  }

  if (!validateEmail(email)) {
    return res.status(400).json("Invalid email format.");
  }

  if (password.length < 6) {
    return res.status(400).json("Password must be at least 6 characters long.");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("Email is already taken.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json("User has been created successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error, please try again later.");
  }
});

module.exports = router;

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("Email and password are required");
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Invalid credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).json("Invalid credentials");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
