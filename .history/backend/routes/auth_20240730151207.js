const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser); // Route to get current user
router.post("/logout", logout); // Route to logout user

module.exports = router;
