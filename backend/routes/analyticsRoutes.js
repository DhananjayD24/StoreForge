/**
 * File: analyticsRoutes.js
 * Purpose:
 * Dashboard analytics APIs.
 */

import express from "express";
import { getDashboardAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// store admin analytics
router.get("/dashboard", protect, getDashboardAnalytics);

export default router;