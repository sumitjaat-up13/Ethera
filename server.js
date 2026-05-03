require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ✅ MUST be BEFORE anything

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// ✅ THIS MUST BE LAST
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});