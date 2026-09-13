const express = require("express");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the Admin Dashboard",
      user: req.user,
    });
  }
);

module.exports = router;