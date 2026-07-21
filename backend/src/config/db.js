const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  connectionTimeout: 15000,
  requestTimeout: 15000,
};

if (process.env.DB_INSTANCE) {
  dbConfig.options.instanceName = process.env.DB_INSTANCE;
} else if (process.env.DB_PORT) {
  dbConfig.port = Number(process.env.DB_PORT);
}

let pool = null;
let poolConnect = null;

function createPool() {
  if (!pool) {
    pool = new sql.ConnectionPool(dbConfig);
    poolConnect = pool.connect();

    pool.on("error", (err) => {
      console.error("Unexpected SQL Server pool error:", err.message);
    });
  }
  return poolConnect;
}

async function getPool() {
  await createPool();
  return pool;
}

async function query(queryText, params = {}) {
  const connectedPool = await getPool();
  const request = connectedPool.request();

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }

  return request.query(queryText);
}

async function getTransaction() {
  const connectedPool = await getPool();
  const transaction = new sql.Transaction(connectedPool);
  await transaction.begin();
  return transaction;
}

async function testConnection() {
  try {
    await getPool();
    console.log(`Connected to SQL Server — database: "${process.env.DB_NAME}"`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
}

async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
    poolConnect = null;
  }
}

module.exports = {
  sql,
  query,
  getPool,
  getTransaction,
  testConnection,
  closePool,
};
