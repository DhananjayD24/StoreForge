/**
 * File: orderController.js
 * Purpose:
 * Handles order creation and retrieval.
 * Ensures tenant-level data isolation.
 */

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { getIO } from "../config/socket.js";

// ==============================
// Create Order (Customer)
// ==============================

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const customerId = req.user.userId;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items provided" });

    let totalAmount = 0;
    let tenantId = null;

    const processedItems = [];

    // ==============================
    // Validate products & calculate total
    // ==============================

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      // ensure same tenant store
      if (!tenantId) tenantId = product.tenantId;

      if (!product.tenantId.equals(tenantId)) {
        return res
          .status(400)
          .json({ message: "Products must belong to same store" });
      }

      // stock validation
      if (product.stock < item.quantity)
        return res.status(400).json({ message: "Insufficient stock" });

      // reduce stock
      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      processedItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // ==============================
    // Create Order
    // ==============================

    const order = await Order.create({
      tenantId,
      customerId,
      items: processedItems,
      totalAmount,
    });
    // ==============================
// Emit Real-Time Notification
// ==============================

const io = getIO();

// notify store admin room
io.to(tenantId.toString()).emit("new-order", {
  message: "New order received",
  orderId: order._id,
  totalAmount: order.totalAmount,
});

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Orders (Store Admin)
// ==============================

export const getTenantOrders = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const orders = await Order.find({ tenantId })
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Customer Orders
// ==============================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customerId: req.user.userId,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};