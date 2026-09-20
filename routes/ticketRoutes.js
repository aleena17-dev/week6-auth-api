const express = require("express");

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create ticket
router.post("/", authMiddleware, createTicket);

// Get all tickets
router.get("/", authMiddleware, getTickets);

// Get single ticket
router.get("/:id", authMiddleware, getTicketById);

// Update ticket
router.put("/:id", authMiddleware, updateTicket);

// Delete ticket
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;