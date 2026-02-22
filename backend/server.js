/**
 * File: server.js
 * Purpose:
 * Starts HTTP server and attaches Socket.io.
 */

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./config/socket.js";
import { socketHandler } from "./sockets/socketHandler.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// connect database
connectDB();

// initialize sockets
const io = initSocket(server);
socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});