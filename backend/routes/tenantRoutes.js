/**
 * File: tenantRoutes.js
 * Purpose:
 * Tenant APIs including self-service store creation.
 */

import express from "express";
import {
  createStoreSelfService,
} from "../controllers/TenantController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================
// Self-Service Store Creation
// ==============================

// any logged-in user can create store
router.post("/create-store", protect, createStoreSelfService);

export default router;