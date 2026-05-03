const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", auth, async (req, res) => {
  const filter = {};

  if (req.query.projectId) {
    filter.projectId = req.query.projectId;
  }

  const tasks = await Task.find(filter)
    .populate("assignedTo")
    .populate("projectId");

  res.json(tasks);
});

// CREATE task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// UPDATE status
router.put("/:id", async (req, res) => {

   if (req.user.role !== "admin") {
    return res.status(403).json("Only admin can update tasks");
  }
  
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
});

module.exports = router;