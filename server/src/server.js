import app from "./app.js";
import { testConnection } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 5000;

// Create HTTP server for Socket.io
const httpServer = http.createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store connected users
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log(`✓ User connected: ${socket.id}`);

  // Store user connection
  socket.on("user-login", (userId) => {
    connectedUsers.set(userId, socket.id);
    io.emit("user-online", { userId, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    // Remove user on disconnect
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        io.emit("user-offline", { userId });
        break;
      }
    }
    console.log(`✗ User disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes
app.locals.io = io;

const bootstrap = async () => {
  try {
    await testConnection();
    httpServer.listen(port, () => {
      console.log(`\n🚀 Server listening on port ${port}`);
      console.log(`📡 Real-time Socket.io enabled`);
      console.log(`🔗 MySQL Database connected\n`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    process.exit(1);
  }
};

bootstrap();
