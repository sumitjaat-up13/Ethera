const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN HIT:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    if (user.password !== password)
      return res.status(400).json("Invalid password");

    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET MISSING ❌");
      return res.status(500).json("Server config error");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    console.log("LOGIN ERROR:", err); // 🔥 THIS WILL SHOW REAL ERROR
    res.status(500).json("Login failed");
  }
});