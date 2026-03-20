import Tenant from "../models/Tenant.js";
import Subscription from "../models/Subscription.js";

export const checkStoreAvailability = async (req, res, next) => {
  try {

    const { slug } = req.params;

    const tenant = await Tenant.findOne({ slug });

    if (!tenant) {
      return res.status(404).json({
        message: "Store not found"
      });
    }

    const subscription = await Subscription.findOne({
      tenantId: tenant._id,
      status: "active"
    });

    if (!subscription) {
      return res.status(403).json({
        storeClosed: true,
        message: "Store closed"
      });
    }

    if (new Date(subscription.endDate) < new Date()) {
      return res.status(403).json({
        storeClosed: true,
        message: "Subscription expired"
      });
    }

    req.tenant = tenant;

    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};