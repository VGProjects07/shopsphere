import { query } from "../models/query.js";

export const listProducts = async ({ search = "", category = "", featured = "" }) => {
  let sql = `
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 1 = 1
  `;
  const params = [];

  if (search) {
    sql += " AND (p.name LIKE ? OR p.brand LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    sql += " AND c.slug = ?";
    params.push(category);
  }

  if (featured) {
    sql += " AND p.featured = ?";
    params.push(featured === "true" ? 1 : 0);
  }

  sql += " ORDER BY p.featured DESC, p.created_at DESC";
  return query(sql, params);
};

export const getProductBySlug = async (slug) => {
  const rows = await query(
    `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
      LIMIT 1
    `,
    [slug]
  );
  return rows[0];
};

export const getCategories = async () =>
  query("SELECT id, name, slug FROM categories ORDER BY name");

export const getRecommendations = async (productId) =>
  query(
    `
      SELECT id, name, slug, brand, price, image_url, rating
      FROM products
      WHERE id != ?
      ORDER BY featured DESC, rating DESC
      LIMIT 4
    `,
    [productId]
  );
