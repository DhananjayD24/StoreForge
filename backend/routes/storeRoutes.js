import express from "express";
import { getPublicStore } from "../controllers/storeController.js";
import { checkStoreAvailability } from "../middleware/checkStoreAvailability.js";

const router = express.Router();

router.get("/:slug", checkStoreAvailability, getPublicStore);

export default router;