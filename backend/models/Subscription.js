/**
 * File: Subscription.js
 * Purpose:
 * Tracks tenant subscription lifecycle.
 * Stores active plan, expiry, and billing info.
 */

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      unique: true, // one active subscription per tenant
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    amountPaid: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);