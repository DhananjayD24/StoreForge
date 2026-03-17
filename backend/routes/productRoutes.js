import express from "express";
import { createProduct, updateProduct, deleteProduct, getMyProducts } from "../controllers/productController.js";

import {protect} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/roleMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
================================================
Store Admin Product Management
================================================
*/

// Create product with multiple images
router.post(
  "/",
  protect,
  authorizeRoles("storeAdmin"),
  upload.array("images", 5),
  createProduct
);

// Get products of logged-in store admin
router.get(
  "/my",
  protect,
  authorizeRoles("storeAdmin"),
  getMyProducts
);

// Update product
router.put(
  "/:id",
  protect,
  authorizeRoles("storeAdmin"),
  upload.array("images", 5),
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  protect,
  authorizeRoles("storeAdmin"),
  deleteProduct
);

export default router;