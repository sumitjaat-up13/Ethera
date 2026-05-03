require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ ADD HERE

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ADD THIS AFTER middleware
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ✅ ADD THIS BEFORE listen
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});