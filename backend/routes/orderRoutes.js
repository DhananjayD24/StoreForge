/**
 * File: orderRoutes.js
 * Purpose:
 * Defines order APIs for customers and store admins.
 */

import express from "express";
import {
  createOrder,
  getTenantOrders,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// customer places order
router.post("/", createOrder);

// store admin views store orders
router.get("/tenant", getTenantOrders);

// customer order history
router.get("/my-orders", getMyOrders);

export default router;