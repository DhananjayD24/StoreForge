/**
 * Function: createStoreSelfService
 * Purpose:
 * Allows any authenticated user to create their own store.
 * Converts user into storeAdmin automatically.
 * Implements SaaS self-service onboarding.
 */

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

// ==============================
// Helper: Generate Updated JWT
// ==============================

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      tenantId: user.tenantId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==============================
// Self-Service Store Creation
// ==============================

export const createStoreSelfService = async (req, res) => {
  try {
    const { storeName } = req.body;

    // logged-in user extracted from authMiddleware
    const userId = req.user.userId;

    // find user
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    // ==============================
    // Prevent multiple stores
    // ==============================
    if (user.tenantId) {
      return res.status(400).json({
        message: "User already owns a store",
      });
    }

    // ==============================
    // Create Tenant
    // ==============================
    const tenant = await Tenant.create({
      storeName,
      ownerId: user._id,
    });

    // ==============================
    // Promote user to Store Admin
    // ==============================
    user.role = "storeAdmin";
    user.tenantId = tenant._id;

    await user.save();

    // ==============================
    // Issue NEW token (updated role)
    // ==============================
    const token = generateToken(user);

    res.status(201).json({
      message: "Store created successfully",
      tenant,
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};