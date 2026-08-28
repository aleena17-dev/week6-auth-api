const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ===============================
// Global Middleware
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===============================
// Health Check
// ===============================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "TaskFlow API is running",
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

// ===============================
// 404 Route Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===============================
// Centralized Error Handler
// IMPORTANT: Must be LAST
// ===============================

app.use(errorHandler);

module.exports = app;