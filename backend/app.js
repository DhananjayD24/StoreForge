/**
 * File: app.js
 * Purpose:
 * Main Express application configuration.
 */

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.send("StoreForge API Running 🚀");
});

app.use("/api/tenants", tenantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscription", subscriptionRoutes);

export default app;