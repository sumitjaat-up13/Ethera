const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json("Project name required");
    }

    const project = await Project.create({
      name: req.body.name,
      createdBy: req.user.id
    });

    res.json(project);

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;