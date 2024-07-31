const express = require("express");
const router = express.Router();
const cors = require("cors");
const authController = require("../controllers/authController");

const corsOptions = {
  origin: "http://localhost:5173", // Your React app's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

router.options("*", cors(corsOptions)); // Handle preflight requests for all routes

router.post("/register", cors(corsOptions), authController.register);
router.post("/login", cors(corsOptions), authController.login);
router.get("/current", cors(corsOptions), authController.getCurrentUser);
router.post("/logout", cors(corsOptions), authController.logout);

module.exports = router;
