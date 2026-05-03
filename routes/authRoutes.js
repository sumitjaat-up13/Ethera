const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Signup failed");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    if (user.password !== password)
      return res.status(400).json("Invalid password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret"
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json("Login failed");
  }
});

module.exports = router;