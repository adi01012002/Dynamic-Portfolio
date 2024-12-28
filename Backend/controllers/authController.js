// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.registerUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Email:", email);
//     console.log("Password:", password);
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error registering user" });
//   }
// };
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
//     const token = jwt.sign({ userId: user._id }, "portfolio", {
//       expiresIn: "30d",
//     });
//     res.json({
//       _id: user._id,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error logging in" });
//   }
// };

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
require("dotenv").config(); // Load .env variables

// Function to generate JWT
const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with user data and token
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email or username
      return res.status(400).json({ message: "Duplicate email or username" });
    }
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// const matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Use matchPassword method to compare passwords
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Respond with user data
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};
// controllers/userController.js
exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  console.log(req.user.id)
  const user1 = await User.findOne({_id:userId});
  console.log(user1)
  if (!user1) return res.status(404).json({ error: "Portfolio not found" });
  res.json({ user1 });
};

// module.exports = { getUserProfile };
