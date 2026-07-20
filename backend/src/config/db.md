# `src/config/db.js` — Explained

`db.js` has no comments in it on purpose — this file is the explanation for it. Keep both files in `src/config/` together.

## What this file is for

One shared SQL Server connection pool for the whole backend. Every model file (`user.model.js`, `product.model.js`, `wishlist.model.js`, `order.model.js`, `contact.model.js`) imports from this exact file instead of opening its own separate connection — that's the whole reason it exists.

## `dbConfig`

```js
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
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  connectionTimeout: 15000,
  requestTimeout: 15000,
};
```

- `user` / `password` / `server` / `database` — pulled straight from `.env`, never hardcoded, so every teammate's local `.env` points this at their own machine.
- `encrypt: false` — fine for local dev; would need to flip to `true` if this ever pointed at Azure SQL instead of a local instance.
- `trustServerCertificate: true` — allows the self-signed certificate a local SQL Server install uses.
- `enableArithAbort: true` — required by the `mssql` package itself, avoids a deprecation warning.
- `pool` — up to 10 simultaneous connections shared across all incoming requests, scaling down to 0 when idle.
- `connectionTimeout` / `requestTimeout` — how long (in ms) to wait before giving up on connecting or on a single query, so a dead database doesn't hang the server forever.

## Named instance vs. fixed port

```js
if (process.env.DB_INSTANCE) {
  dbConfig.options.instanceName = process.env.DB_INSTANCE;
} else if (process.env.DB_PORT) {
  dbConfig.port = Number(process.env.DB_PORT);
}
```

SQL Server Express installs almost always use a **named instance** (commonly `SQLEXPRESS`), not a fixed port. These two settings are mutually exclusive — this block picks whichever one is actually set in `.env` and ignores the other.

## The pool lifecycle: `createPool()` / `getPool()`

```js
let pool = null;
let poolConnect = null;

function createPool() {
  if (!pool) {
    pool = new sql.ConnectionPool(dbConfig);
    poolConnect = pool.connect();
    pool.on("error", (err) =>
      console.error("Unexpected SQL Server pool error:", err.message),
    );
  }
  return poolConnect;
}

async function getPool() {
  await createPool();
  return pool;
}
```

The pool is created **lazily** — importing `db.js` alone never opens a connection. The first time anything calls `getPool()` (directly, or indirectly through `query()`), `createPool()` runs once, and every call after that reuses the same pool instead of opening a new one. The `pool.on("error", ...)` listener catches connection-level failures that happen later (e.g. the database going down mid-session) so they're logged instead of crashing the whole process silently.

## `query(queryText, params)`

```js
async function query(queryText, params = {}) {
  const connectedPool = await getPool();
  const request = connectedPool.request();
  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }
  return request.query(queryText);
}
```

This is the function every model file will use for almost everything. `params` is a plain object; each key becomes a named `@key` placeholder that gets safely bound into the query — this is what protects the whole project from SQL injection, so no model file should ever build a query string by hand with concatenation. The return value is the full `mssql` result object; `result.recordset` is the array of rows you actually want.

**Example, inside a model file:**

```js
const { query } = require("../config/db");

async function findByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = @email", {
    email,
  });
  return result.recordset[0];
}
```

## `getTransaction()`

```js
async function getTransaction() {
  const connectedPool = await getPool();
  const transaction = new sql.Transaction(connectedPool);
  await transaction.begin();
  return transaction;
}
```

For anywhere multiple writes need to succeed or fail together — the clearest example is placing an order: one `orders` row plus multiple `order_items` rows, where a failure partway through should undo everything already inserted rather than leaving a half-created order.

**Example usage:**

```js
const transaction = await getTransaction();
try {
  const request = new sql.Request(transaction);
  request.input("userId", userId);
  await request.query("INSERT INTO orders (...) VALUES (...)");
  await transaction.commit();
} catch (err) {
  await transaction.rollback();
  throw err;
}
```

## `testConnection()`

```js
async function testConnection() {
  try {
    await getPool();
    console.log(`Connected to SQL Server — database: "${process.env.DB_NAME}"`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
}
```

Called once from `server.js`, before the server starts accepting requests. A bad `.env` (wrong password, wrong instance name, SQL Server not running) fails loudly and immediately here — instead of the server reporting "running" and only breaking later, silently, on someone's first real API call.

## `closePool()`

```js
async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
    poolConnect = null;
  }
}
```

Not used during normal server operation — it exists for cleanly releasing the connection in an automated test suite, if the team ever adds one.

## What gets exported

```js
module.exports = {
  sql,
  query,
  getPool,
  getTransaction,
  testConnection,
  closePool,
};
```

`sql` itself is exported too, since `getTransaction()`'s usage pattern above needs `new sql.Request(transaction)` — any model file doing manual transaction work needs the raw `sql` object, not just the helper functions.
