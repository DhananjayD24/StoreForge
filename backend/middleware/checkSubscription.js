import Subscription from "../models/Subscription.js";

export const checkSubscription = async (req, res, next) => {
  try {

    const subscription = await Subscription
      .findOne({
        tenantId: req.user.tenantId,
        status: "active"
      })
      .populate("planId");

    if (!subscription) {
      return res.status(403).json({
        message: "No active subscription"
      });
    }

    const now = new Date();

    if (subscription.endDate < now) {
      return res.status(403).json({
        message: "Subscription expired"
      });
    }

    req.subscription = subscription;

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};