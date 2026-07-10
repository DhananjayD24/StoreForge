/**
 * File: app.js
 * Purpose:
 * Main Express application configuration.
 */

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import storeRoutes from "./routes/storeRoutes.js"
import path from "path";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const allowedOrigins = process.env.CORS_ORIGIN.split(",");
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Rent Virtual Stores API Running 🚀");
});

app.use("/api/tenants", tenantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/store", storeRoutes)
app.use("/uploads", express.static("uploads"));

export default app;