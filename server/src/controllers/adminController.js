import { query } from "../models/query.js";
import { mockSalesByMonth } from "../data/mockAnalytics.js";

export const getDashboardStats = async (_req, res, next) => {
  try {
    const [sales] = await query("SELECT COALESCE(SUM(total_amount), 0) AS totalSales FROM orders");
    const [users] = await query("SELECT COUNT(*) AS totalUsers FROM users");
    const [inventory] = await query("SELECT COALESCE(SUM(stock), 0) AS totalInventory FROM products");
    const lowStock = await query(
      "SELECT id, name, stock FROM products WHERE stock < 20 ORDER BY stock ASC LIMIT 5"
    );

    res.json({
      summary: {
        totalSales: Number(sales.totalSales || 0),
        totalUsers: users.totalUsers,
        totalInventory: inventory.totalInventory
      },
      charts: mockSalesByMonth,
      lowStock
    });
  } catch (error) {
    next(error);
  }
};
