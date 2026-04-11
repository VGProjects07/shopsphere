// Real-time notification utility for Socket.io events

export const notifyProductUpdate = (io, productId, data) => {
  io.emit("product-updated", { productId, data, timestamp: new Date() });
};

export const notifyStockChange = (io, productId, newStock) => {
  io.emit("stock-changed", { productId, newStock, timestamp: new Date() });
};

export const notifyCartUpdate = (io, userId, cart) => {
  io.to(`user-${userId}`).emit("cart-updated", { cart, timestamp: new Date() });
};

export const notifyOrderUpdate = (io, orderId, status) => {
  io.emit("order-updated", { orderId, status, timestamp: new Date() });
};

export const notifyReviewAdded = (io, productId, review) => {
  io.emit("review-added", { productId, review, timestamp: new Date() });
};

export const notifyWishlistUpdate = (io, userId, wishlist) => {
  io.to(`user-${userId}`).emit("wishlist-updated", { wishlist, timestamp: new Date() });
};

export const notifyNewOrder = (io, order) => {
  io.emit("new-order", { order, timestamp: new Date() });
};
