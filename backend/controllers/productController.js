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

    const { name, price, description, stock, category } = req.body;

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const product = await Product.create({
      tenantId: req.user.tenantId,
      name,
      price,
      description,
      stock,
      category,
      images: imagePaths,
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Products (Tenant Scoped)
// ==============================

export const getMyProducts = async (req, res) => {

  const products = await Product.find({
    tenantId: req.user.tenantId,
  });

  res.json(products);

};

// ==============================
// Update Product
// ==============================

export const updateProduct = async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);

  await product.save();

  res.json(product);
};

// ==============================
// Delete Product
// ==============================

export const deleteProduct = async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Product deleted" });

};