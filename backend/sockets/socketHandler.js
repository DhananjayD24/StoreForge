/**
 * File: socketHandler.js
 * Purpose:
 * Handles socket connections and tenant room joining.
 */

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ==============================
    // Join Tenant Room
    // ==============================

    socket.on("join-tenant", (tenantId) => {
      socket.join(tenantId);
      console.log(`Socket joined tenant room: ${tenantId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};