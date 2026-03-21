export const socketHandler = (io) => {

  io.on("connection", (socket) => {

    socket.on("join-tenant", (tenantId) => {
      socket.join(tenantId);
    });

  });

};