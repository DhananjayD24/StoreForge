/**
 * File: roleMiddleware.js
 * Purpose:
 * Restricts route access based on user role.
 * Used for Super Admin / Store Admin protection.
 */

// allowedRoles = ["superAdmin"]
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // role extracted from JWT in authMiddleware
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};