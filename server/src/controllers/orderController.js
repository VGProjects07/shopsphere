import { body } from "express-validator";
import { pool } from "../config/db.js";
import { query } from "../models/query.js";
import { ApiError } from "../utils/apiError.js";

export const checkoutValidation = [
  body("paymentMethod").trim().notEmpty().withMessage("paymentMethod is required"),
  body("shippingAddress").isObject().withMessage("shippingAddress is required")
];

export const getOrders = async (req, res, next) => {
  try {
    const rows = await query(
      `
        SELECT id, total_amount, payment_method, payment_status, order_status, shipping_address, created_at
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
      `,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const { paymentMethod, shippingAddress } = req.body;
    await connection.beginTransaction();

    const [cartItems] = await connection.execute(
      `
        SELECT c.product_id, c.quantity, p.price, p.stock
        FROM cart_items c
        JOIN products p ON p.id = c.product_id
        WHERE c.user_id = ?
      `,
      [req.user.id]
    );

    if (!cartItems.length) {
      throw new ApiError(400, "Cart is empty");
    }

    let total = 0;
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        throw new ApiError(400, "One of the items is out of stock");
      }
      total += Number(item.price) * item.quantity;
    }

    const [orderResult] = await connection.execute(
      `
        INSERT INTO orders (user_id, total_amount, payment_method, payment_status, order_status, shipping_address)
        VALUES (?, ?, ?, 'paid', 'Pending', ?)
      `,
      [req.user.id, total.toFixed(2), paymentMethod, JSON.stringify(shippingAddress)]
    );

    for (const item of cartItems) {
      await connection.execute(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderResult.insertId, item.product_id, item.quantity, item.price]
      );
      await connection.execute("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.product_id
      ]);
    }

    await connection.execute("DELETE FROM cart_items WHERE user_id = ?", [req.user.id]);
    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: orderResult.insertId,
      payment: {
        provider: "MockPay",
        transactionId: `MOCK-${Date.now()}`
      }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

export const getAllOrders = async (_req, res, next) => {
  try {
    const rows = await query(
      `
        SELECT o.id, o.total_amount, o.payment_status, o.order_status, o.created_at, u.name AS customer_name, u.email
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ORDER BY o.created_at DESC
      `
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    await query("UPDATE orders SET order_status = ? WHERE id = ?", [
      req.body.status,
      req.params.id
    ]);
    res.json({ message: "Order status updated" });
  } catch (error) {
    next(error);
  }
};
