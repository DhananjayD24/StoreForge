/**
 * File: planRoutes.js
 * Purpose:
 * Defines APIs for subscription plans.
 */

import express from "express";
import {
  createPlan,
  getPlans,
  updatePlan,
  deactivatePlan,
} from "../controllers/planController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ==============================
// Public Route (Store Admin View)
// ==============================

router.get("/", getPlans);

// ==============================
// Super Admin Routes
// ==============================

router.post("/", protect, authorizeRoles("superAdmin"), createPlan);

router.patch(
  "/:id",
  protect,
  authorizeRoles("superAdmin"),
  updatePlan
);

router.patch(
  "/:id/deactivate",
  protect,
  authorizeRoles("superAdmin"),
  deactivatePlan
);

export default router;