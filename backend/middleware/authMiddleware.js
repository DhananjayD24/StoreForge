/**
 * File: authMiddleware.js
 * Purpose:
 * Protects routes by verifying JWT token.
 * Extracts user identity and tenantId for SaaS isolation.
 */

import jwt from "jsonwebtoken";

// ==============================
// Verify Authentication
// ==============================

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized" });

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    req.user = decoded;
    req.tenantId = decoded.tenantId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};