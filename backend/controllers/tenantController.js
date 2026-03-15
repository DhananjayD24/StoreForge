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
import Plan from "../models/Plan.js";
import Subscription from "../models/Subscription.js";

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
    { expiresIn: "7d" },
  );
};

// ==============================
// Self-Service Store Creation
// ==============================

export const createStoreSelfService = async (req, res) => {
  try {
    const { storeName, planId } = req.body;
    if (!storeName || !planId) {
      return res.status(400).json({
        message: "storeName and planId are required",
      });
    }

    // logged-in user extracted from authMiddleware
    const userId = req.user.userId;

    // find user
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

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
    // Validate Selected Plan
    // ==============================

    const selectedPlan = await Plan.findById(planId);

    if (!selectedPlan || !selectedPlan.active) {
      return res.status(400).json({
        message: "Invalid or inactive plan",
      });
    }

    const startDate = new Date();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + selectedPlan.durationDays);

    // create subscription
    try {
      await Subscription.create({
        tenantId: tenant._id,
        planId: selectedPlan._id,
        startDate,
        endDate,
        amountPaid: selectedPlan.price,
      });
    } catch (err) {
      await Tenant.findByIdAndDelete(tenant._id);
      throw err;
    }

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
