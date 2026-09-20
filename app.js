const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// ===============================
// Security Middleware
// ===============================

app.use(helmet());
app.use(cors());

// ===============================
// Global Middleware
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===============================
// Auth Rate Limiter
// ===============================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});

// ===============================
// Health Check
// ===============================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "SmartCampus API is running",
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/tasks", taskRoutes);

app.use("/api/categories", categoryRoutes);

// Week 6 Authentication
app.use("/api/auth", authLimiter, authRoutes);

// Week 6 Admin
app.use("/api/admin", adminRoutes);

// Capstone Ticket System
app.use("/api/tickets", ticketRoutes);

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
// ===============================

app.use(errorHandler);

module.exports = app;