const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Handle preflight requests
router.options("*", cors());

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/current", authController.getCurrentUser);
router.post("/logout", authController.logout);

module.exports = router;
