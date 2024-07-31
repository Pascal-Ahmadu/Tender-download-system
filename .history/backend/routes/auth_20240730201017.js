const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../controllers/authController");
const { auth, adminAuth } = require("../middlewares/auth");

const corsOptions = {
  origin: "http://localhost:5173", // Your React app's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

router.use(cors(corsOptions)); // Apply CORS to all routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current", auth, getCurrentUser);
router.get("/admin/data", auth, adminAuth, (req, res) => {
  res.json({ msg: "Admin data" });
});
module.exports = router;
