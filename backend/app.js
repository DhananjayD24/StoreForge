/**
 * File: app.js
 * Purpose:
 * Main Express application configuration.
 */

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";

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

export default app;