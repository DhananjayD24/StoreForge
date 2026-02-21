/**
 * File: Tenant.js
 * Purpose:
 * Defines Tenant (Store) schema.
 * Each tenant represents an independent store
 * in the StoreForge multi-tenant SaaS system.
 */

import mongoose from "mongoose";

// ==============================
// Tenant Schema
// ==============================

const tenantSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },

    // owner of the store
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // subscription plan
    plan: {
      type: String,
      enum: ["Free", "Pro", "Enterprise"],
      default: "Free",
    },

    // tenant lifecycle status
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);