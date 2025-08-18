const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authRoutes = express.Router();

// Register Route
authRoutes.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log("[REGISTER] Received:", email);

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hash });
    console.log("[REGISTER] Success:", user);

    const userData = {
      _id: user._id,
      email: user.email,
    };

    res.status(201).json({
      message: `Success! User with email '${email}' registered.`,
      user: userData,
    });
  } catch (err) {
    console.error("[REGISTER] Error:", err.message);
    res.status(500).json({
      message: 'Registration failed. Please try again.',
      error: err.message,
    });
  }
});

// Login Route
authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("[LOGIN] Try:", email);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.warn("[LOGIN] No user found for email:", email);
      return res.status(401).json({ message: "Invalid email or password. Please check and try again." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("[LOGIN] Password mismatch for:", email);
      return res.status(401).json({ message: "Invalid email or password. Please check and try again." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' }
    );
    console.log("[LOGIN] Success, token generated for:", email);

    // Set cookie with 'none' sameSite for cross-domain and secure true for HTTPS
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.json({
      message: `Welcome back, ${email}! You have logged in successfully.`,
      email: user.email,
    });
  } catch (err) {
    console.error("[LOGIN] Server Error:", err.message);
    res.status(500).json({
      message: "An unexpected server error occurred during login. Please try again later.",
      error: err.message,
    });
  }
});

// Logout Route
authRoutes.get('/logout', (req, res) => {
  console.log("[LOGOUT] Clearing token cookie");
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });
  
  res.json({
    message: 'You have been logged out successfully. See you again soon!',
  });
});

// Current user info Route
authRoutes.get('/me', async (req, res) => {
  const token = req.cookies.token;
  console.log("[ME] Checking token:", token ? "Exists" : "Missing");

  if (!token) {
    return res.status(401).json({
      message: 'Not authenticated. Please log in to access your profile.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("[ME] Token decoded:", decoded);

    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      console.warn("[ME] User not found for id:", decoded.id);
      return res.status(404).json({
        message: 'User profile not found. Please contact support if this issue persists.',
      });
    }

    res.json({
      message: 'User profile fetched successfully.',
      user,
    });
  } catch (err) {
    console.error("[ME] Server Error:", err.message);
    res.status(500).json({
      message: 'Server error occurred while retrieving user profile.',
      error: err.message,
    });
  }
});

module.exports = authRoutes;
