/**
 * File: upgradeController.js
 * Purpose:
 * Handles subscription upgrade preview and execution.
 */

import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";
import { calculateProratedAmount } from "../services/pricingService.js";
import Product from "../models/Product.js";

// ==============================
// Preview Upgrade Cost
// ==============================

export const previewUpgrade = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const newPlanId = req.params.planId;

    const subscription = await Subscription.findOne({
      tenantId,
    }).populate("planId");

    if (!subscription)
      return res
        .status(404)
        .json({ message: "No subscription found" });

    const newPlan = await Plan.findById(newPlanId);

    if (!newPlan || !newPlan.active)
      return res
        .status(400)
        .json({ message: "Invalid or inactive plan" });

    const pricing = calculateProratedAmount(
      subscription.planId,
      newPlan,
      subscription
    );

    res.json({
      currentPlan: subscription.planId.name,
      newPlan: newPlan.name,
      remainingCredit: pricing.remainingCredit,
      amountToPay: pricing.payableAmount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Execute Plan Upgrade
// ==============================

export const upgradePlan = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { newPlanId } = req.body;

    const subscription = await Subscription.findOne({
      tenantId,
    }).populate("planId");

    if (!subscription)
      return res
        .status(404)
        .json({ message: "No subscription found" });

    const newPlan = await Plan.findById(newPlanId);

    if (!newPlan || !newPlan.active)
      return res
        .status(400)
        .json({ message: "Invalid or inactive plan" });

    const pricing = calculateProratedAmount(
      subscription.planId,
      newPlan,
      subscription
    );

    // ============================
    // Simulate payment success
    // ============================

    const startDate = new Date();
    const endDate = new Date();

    endDate.setDate(
      endDate.getDate() + newPlan.durationDays
    );

    subscription.planId = newPlan._id;
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    subscription.amountPaid += pricing.payableAmount;

    await subscription.save();

    // ============================
    // Freeze / Unfreeze Products
    // ============================

    const products = await Product
      .find({ tenantId })
      .sort({ createdAt: 1 });

    const limit = newPlan.productLimit;

    for (let i = 0; i < products.length; i++) {

      if (i < limit) {
        products[i].isFrozen = false;
        products[i].frozenReason = null;
      } else {
        products[i].isFrozen = true;
        products[i].frozenReason = "Plan product limit exceeded";
      }

      await products[i].save();
    }

    res.json({
      message: "Plan updated successfully",
      amountPaid: pricing.payableAmount,
      newPlan: newPlan.name,
      productLimit: limit,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};