import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const tenantId = new mongoose.Types.ObjectId(req.user.tenantId);

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

    const totalProducts = await Product.countDocuments({ tenantId });

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
      {
        $project: {
          date: "$_id",
          revenue: 1,
          orders: 1,
          _id: 0,
        },
      },
    ]);

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
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
