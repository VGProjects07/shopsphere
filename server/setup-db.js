import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to split SQL statements properly
function parseSqlFile(content) {
  return content
    .split(";")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));
}

async function setupDatabase() {
  let connection;
  try {
    // Create connection without specifying database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    console.log("✓ Connected to MySQL server");

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, "..", "database", "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    // Split by semicolon and execute each statement
    const statements = parseSqlFile(schemaSql);

    for (const statement of statements) {
      try {
        await connection.query(statement);
      } catch (err) {
        // Only log non-duplicate errors
        if (!err.message.includes("already exists")) {
          console.error("Statement error:", err.message);
        }
      }
    }

    console.log("✓ Database schema created successfully");

    // Read and execute seed.sql if it exists
    const seedPath = path.join(__dirname, "..", "database", "seed.sql");
    if (fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, "utf-8");
      const seedStatements = parseSqlFile(seedSql);

      for (const statement of seedStatements) {
        try {
          await connection.query(statement);
        } catch (err) {
          // Handle duplicate key errors gracefully
          if (!err.message.includes("Duplicate entry")) {
            console.error("Seed error:", err.message);
          }
        }
      }
      console.log("✓ Database seeded successfully");
    }

    console.log("\n✓ Database setup completed successfully!");
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Host: ${process.env.DB_HOST}`);
  } catch (error) {
    console.error("✗ Database setup failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
