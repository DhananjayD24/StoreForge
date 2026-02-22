/**
 * File: Product.js
 * Purpose:
 * Defines product schema.
 * Each product belongs to a tenant (store).
 * Enables multi-tenant data isolation.
 */

import mongoose from "mongoose";

// ==============================
// Product Schema
// ==============================

const productSchema = new mongoose.Schema(
  {
    // SaaS Isolation Key
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);