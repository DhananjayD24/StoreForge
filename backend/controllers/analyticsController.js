/**
 * File: analyticsController.js
 * Purpose:
 * Provides dashboard analytics using MongoDB aggregation.
 * Data is tenant-scoped for SaaS isolation.
 */

import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ==============================
// Get Store Dashboard Analytics
// ==============================

export const getDashboardAnalytics = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    // ==============================
    // Total Revenue + Orders
    // ==============================

    const revenueData = await Order.aggregate([
      { $match: { tenantId } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // ==============================
    // Total Products
    // ==============================

    const totalProducts = await Product.countDocuments({
      tenantId,
    });

    // ==============================
    // Daily Revenue Chart
    // ==============================

    const dailyRevenue = await Order.aggregate([
      { $match: { tenantId } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // ==============================
    // Recent Orders
    // ==============================

    const recentOrders = await Order.find({ tenantId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      totalOrders: revenueData[0]?.totalOrders || 0,
      totalProducts,
      dailyRevenue,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};