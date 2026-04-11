import app from "./app.js";
import { testConnection } from "./config/db.js";

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    await testConnection();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
};

bootstrap();
