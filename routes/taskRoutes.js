const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching tasks");
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error creating task");
  }
});

module.exports = router;