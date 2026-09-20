const Ticket = require("../models/Ticket");

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create ticket",
      error: error.message,
    });
  }
};

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get tickets",
      error: error.message,
    });
  }
};

// Get single ticket
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get ticket",
      error: error.message,
    });
  }
};

// Update ticket
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update ticket",
      error: error.message,
    });
  }
};

// Delete ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete ticket",
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};