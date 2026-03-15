/**
 * File: Plan.js
 * Purpose:
 * Stores subscription plans configurable by Super Admin.
 * Enables dynamic SaaS pricing.
 */

import mongoose from "mongoose";

// ==============================
// Plan Schema
// ==============================

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // prevents duplicate plans
    },

    price: {
      type: Number,
      required: true, // INR
    },

    durationDays: {
      type: Number,
      required: true,
    },

    productLimit: {
      type: Number,
      default: 10,
    },

    features: [String],

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);