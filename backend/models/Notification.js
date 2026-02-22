/**
 * File: Notification.js
 * Purpose:
 * Stores persistent notifications for users.
 * Enables notification dropdown & read tracking.
 */

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["info", "success", "warning"],
      default: "info",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);