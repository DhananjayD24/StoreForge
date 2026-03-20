/**
 * File: analyticsRoutes.js
 * Purpose:
 * Dashboard analytics APIs.
 */

import express from "express";
import { getDashboardAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { checkSubscription } from "../middleware/checkSubscription.js";

const router = express.Router();

// store admin analytics
router.get("/dashboard", protect, authorizeRoles("storeAdmin"), checkSubscription,getDashboardAnalytics);

export default router;