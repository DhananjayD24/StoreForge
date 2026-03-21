import express from "express";
import { createProduct, updateProduct, deleteProduct, getMyProducts, getProductById } from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { checkSubscription } from "../middleware/checkSubscription.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
================================================
Store Admin Product Management
================================================
*/

// Create product
router.post(
  "/",
  protect,
  authorizeRoles("storeAdmin"),
  checkSubscription,
  upload.array("images", 5),
  createProduct
);

// Get products
router.get(
  "/my",
  protect,
  authorizeRoles("storeAdmin"),
  checkSubscription,
  getMyProducts
);

// Update product
router.put(
  "/:id",
  protect,
  authorizeRoles("storeAdmin"),
  checkSubscription,
  upload.array("images", 5),
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  protect,
  authorizeRoles("storeAdmin"),
  checkSubscription,
  deleteProduct
);

router.get("/:id", getProductById);

export default router;