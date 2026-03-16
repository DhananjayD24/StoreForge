import express from "express";
import { getPublicStore } from "../controllers/storeController.js";

const router = express.Router();

// public store page
router.get("/:slug", getPublicStore);

export default router;