/**
 * File: subscriptionController.js
 * Purpose:
 * Handles retrieving subscription data for tenants.
 */

import Subscription from "../models/Subscription.js";

// ==============================
// Get Current Subscription
// ==============================

export const getMySubscription = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const subscription = await Subscription.findOne({
      tenantId,
    }).populate("planId");

    if (!subscription) {
      return res
        .status(404)
        .json({ message: "No subscription found" });
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};