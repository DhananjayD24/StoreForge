import express from "express";
import { getMySubscription } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { previewUpgrade, upgradePlan } from "../controllers/upgradeController.js";

const router = express.Router();

router.get("/me", protect, getMySubscription);

router.get("/upgrade-preview/:planId", protect, previewUpgrade);

router.post("/upgrade", protect, upgradePlan);

export default router;