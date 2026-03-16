import Tenant from "../models/Tenant.js";
import Product from "../models/Product.js";

export const getPublicStore = async (req, res) => {
  try {
    const { slug } = req.params;

    // find store
    const tenant = await Tenant.findOne({ storeSlug: slug });

    if (!tenant) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    // fetch store products
    const products = await Product.find({
      tenantId: tenant._id,
    });

    res.json({
      storeName: tenant.storeName,
      tagline: tenant.tagline,
      tenantId: tenant._id,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};