/**
 * File: planController.js
 * Purpose:
 * Handles SaaS plan management.
 * Super Admin can create/update plans.
 */

import Plan from "../models/Plan.js";

// ==============================
// Create Plan (Super Admin)
// ==============================

export const createPlan = async (req, res) => {
  try {
    const { name, price, durationDays, productLimit, features } =
      req.body;

    const plan = await Plan.create({
      name,
      price,
      durationDays,
      productLimit,
      features,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Active Plans (Public)
// ==============================

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ active: true });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Update Plan (Super Admin)
// ==============================

export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Disable Plan
// ==============================

export const deactivatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};