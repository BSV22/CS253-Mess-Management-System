// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// student register
router.post("/register", authController.registerStudent);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);

// login
router.post("/login", authController.login);
router.post("/login-face", authController.loginFace);

// change password
router.put("/change-password", protect, authController.changePassword);

// face register (must be authenticated so we know whose face to train)
router.post("/register-face", protect, authController.registerFace);

// profile
router.get("/profile", protect, authController.getProfile);

module.exports = router;