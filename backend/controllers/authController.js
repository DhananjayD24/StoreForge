/**
 * File: authController.js
 * Purpose:
 * Handles authentication logic including:
 * - User Registration
 * - User Login
 * - JWT token generation
 */

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==============================
// Helper: Generate JWT Token
// ==============================

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      tenantId: user.tenantId, // used later for tenant isolation
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==============================
// Register User
// ==============================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Login User
// ==============================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user),
      role: user.role,
      tenantId: user.tenantId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};