
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// 🚨 THIS LINE IS CRITICAL
app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("URI:", process.env.MONGO_URI);
});