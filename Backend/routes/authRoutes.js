const express = require("express");
const { registerUser, loginUser ,getUserProfile} = require("../controllers/authController");
const authenticate = require("../authenticate");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getUserProfile);

module.exports = router;
