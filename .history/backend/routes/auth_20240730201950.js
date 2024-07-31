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

router.use(cors(corsOptions)); // Apply CORS to all routes

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/current", authController.getCurrentUser);
router.post("/logout", authController.logout);

module.exports = router;
