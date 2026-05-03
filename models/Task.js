const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo"
  },
  dueDate: Date,

  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", taskSchema);