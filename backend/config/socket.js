/**
 * File: socket.js
 * Purpose:
 * Initializes Socket.io server for real-time communication.
 */

import { Server } from "socket.io";

let io;

// ==============================
// Initialize Socket Server
// ==============================

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  console.log("✅ Socket.io initialized");

  return io;
};

// ==============================
// Access Socket Instance Anywhere
// ==============================

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};