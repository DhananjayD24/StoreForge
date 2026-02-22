/**
 * File: productController.js
 * Purpose:
 * Handles tenant-scoped product operations.
 * Every query filtered using tenantId.
 */

import Product from "../models/Product.js";

// ==============================
// Create Product
// ==============================

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    // tenantId extracted from JWT
    const tenantId = req.tenantId;

    if (!tenantId)
      return res.status(403).json({
        message: "Store not found. Create store first.",
      });

    const product = await Product.create({
      tenantId,
      name,
      description,
      price,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Products (Tenant Scoped)
// ==============================

export const getProducts = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    // 🔥 CORE SAAS LINE
    const products = await Product.find({ tenantId });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Update Product
// ==============================

export const updateProduct = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, tenantId }, // prevents cross-tenant edits
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Delete Product
// ==============================

export const deleteProduct = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    await Product.findOneAndDelete({
      _id: req.params.id,
      tenantId,
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};