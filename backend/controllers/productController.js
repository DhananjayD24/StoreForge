/**
 * File: productController.js
 * Purpose:
 * Handles tenant-scoped product operations.
 * Every query filtered using tenantId.
 */

import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// ==============================
// Create Product
// ==============================

export const createProduct = async (req, res) => {
  try {

    const { name, price, description, stock, category } = req.body;

    // Cloudinary already uploaded images
    const imageUrls = req.files.map(file => file.path);

    const product = await Product.create({
      tenantId: req.user.tenantId,
      name,
      price,
      description,
      stock,
      category,
      images: imageUrls
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
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, description, stock, category } = req.body;

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;

    // If new images uploaded
    if (req.files && req.files.length > 0) {

      // =============================
      // Delete old images from Cloudinary
      // =============================

      for (const imageUrl of product.images) {

        const parts = imageUrl.split("/");
        const filename = parts[parts.length - 1];
        const publicId = "storeforge_products/" + filename.split(".")[0];

        await cloudinary.uploader.destroy(publicId);

      }

      // =============================
      // Save new images
      // =============================

      product.images = req.files.map(file => file.path);

    }

    await product.save();

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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    for (const imageUrl of product.images) {

      const parts = imageUrl.split("/");
      const filename = parts[parts.length - 1];
      const publicId = "storeforge_products/" + filename.split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};