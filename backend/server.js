require("dotenv").config();
const app = require("./src/app");
const { testConnection } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error(
      "Failed to start server — database connection could not be established.",
    );
    process.exit(1);
  }
};

startServer();
