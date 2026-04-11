import { apiRequest } from "./client.js";

// Real-time Socket.io client for frontend

let socket = null;

export const initSocket = (token) => {
  // Dynamically import socket.io-client
  import("socket.io-client").then(({ io }) => {
    socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000", {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socket.on("connect", () => {
      console.log("✓ Real-time connection established");
    });

    socket.on("disconnect", () => {
      console.log("✗ Real-time connection lost");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return socket;
  });
};

export const onProductUpdate = (callback) => {
  if (socket) socket.on("product-updated", callback);
};

export const onStockChange = (callback) => {
  if (socket) socket.on("stock-changed", callback);
};

export const onCartUpdate = (callback) => {
  if (socket) socket.on("cart-updated", callback);
};

export const onOrderUpdate = (callback) => {
  if (socket) socket.on("order-updated", callback);
};

export const onReviewAdded = (callback) => {
  if (socket) socket.on("review-added", callback);
};

export const onWishlistUpdate = (callback) => {
  if (socket) socket.on("wishlist-updated", callback);
};

export const onNewOrder = (callback) => {
  if (socket) socket.on("new-order", callback);
};

export const emitUserLogin = (userId) => {
  if (socket) socket.emit("user-login", userId);
};

export const offAllEvents = () => {
  if (socket) {
    socket.off("product-updated");
    socket.off("stock-changed");
    socket.off("cart-updated");
    socket.off("order-updated");
    socket.off("review-added");
    socket.off("wishlist-updated");
    socket.off("new-order");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
