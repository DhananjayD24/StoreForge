/**
 * File: User.js
 * Purpose:
 * Defines User schema for StoreForge SaaS platform.
 * Supports multi-role authentication and tenant isolation.
 */

import mongoose from "mongoose";

// ==============================
// User Schema Definition
// ==============================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // prevents duplicate accounts
    },

    password: {
      type: String,
      required: true, // stored as hashed password
    },

    role: {
      type: String,
      enum: ["customer", "storeAdmin", "superAdmin"],
      default: "customer",
    },

    // tenantId enables multi-tenant SaaS isolation
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);