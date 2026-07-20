# gamers-store Backend — Phase 0 Code, Fully Explained

Everything in this document is already built and working. This is the reference for exactly what each Phase 0 file does, how your teammates will build on top of it in Phase 1, and how to actually get a working database running via SSMS — including what changed since the project moved from MySQL to SQL Server.

## The big picture: what "Phase 0" actually delivered

Phase 0 is the skeleton: a server that starts, connects to a database, and has all the shared plumbing (auth checking, error handling, token signing) ready for five people to build features on top of. Nothing in Phase 0 has feature-specific logic — no products, no orders, no users beyond the table definition. That's Phase 1's job.

---

## `server.js` — the entry point

```js
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
```

This is the file you actually run: `node server.js`. Line by line:

- `require("dotenv").config()` — loads every value from `.env` into `process.env`, so every other file in the project can read `process.env.DB_USER`, `process.env.JWT_SECRET`, etc.
- `require("./src/app")` — pulls in the fully assembled Express app (see below) — this file doesn't build the app, just runs it.
- `testConnection()` — actually attempts a connection to SQL Server _before_ the server starts accepting requests. If your `.env` has the wrong password or SQL Server isn't running, this fails immediately and loudly, with `process.exit(1)` stopping the whole thing — instead of the server silently reporting "running" and only breaking on someone's first real request.
- `app.listen(PORT, ...)` — starts listening for real HTTP traffic once the database check passes.

**How your group uses this file:** they don't touch it. Nobody adds feature logic here, ever. If a teammate finds themselves wanting to edit `server.js` for a new feature, that's a sign the logic belongs somewhere else — almost always a new `*.routes.js` file registered in `routes/index.js`.

---

## `src/app.js` — assembling the application

```js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

module.exports = app;
```

Order matters here — every request passes through these `app.use()` lines top to bottom:

1. `cors(corsOptions)` — only allows requests from whatever URL is set as `CORS_ORIGIN` in `.env` (your Vite frontend). Without this, the browser blocks the frontend from ever reaching this server, since they run on different ports.
2. `express.json()` / `express.urlencoded()` — teaches Express to actually read a request's body, whether it's JSON (`{ "email": "..." }`) or an old-style form submission.
3. `app.use("/api", routes)` — everything starting with `/api` gets handed to the switchboard file (`routes/index.js`) to route further.
4. The unnamed 404 handler — catches anything that didn't match _any_ route above it.
5. `errorHandler` — always last. Catches anything thrown anywhere upstream.

**How your group uses this file:** also basically untouched by teammates. The only time anyone edits `app.js` is if a genuinely new _global_ rule is needed (a new piece of middleware that should run on every request) — a single feature never needs to touch this file.

---

## `src/routes/index.js` — the switchboard (currently minimal, will grow)

```js
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "gamers-store API is running" });
});

module.exports = router;
```

Right now, one endpoint: `GET /api/health`. This is the file everyone else's route files get plugged into. Once Oreoluwa finishes `auth.routes.js`, this file gains a line like:

```js
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);
```

...and so on for every teammate's feature. **This file is genuinely never "done"** until all five people's routes are registered — treat every edit to it as a small, separate PR, and say so in the team chat first, since two people editing the same lines at once is the single easiest way to get an avoidable merge conflict.

---

## `src/middleware/errorHandler.js` — the cleanup crew

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode =
    err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || `Something went wrong on the server`,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
```

- Logs the full error to the terminal for debugging.
- Picks a sensible status code: uses `err.statusCode` if whoever threw the error set one, otherwise assumes `500` (server's fault).
- Sends back one consistent JSON shape, and only includes the raw stack trace in development — never in production, where you don't want to leak internals.

**How your group uses this file:** nobody edits it. Instead, every teammate's service/controller code should throw errors that _this_ file catches — e.g. `const err = new Error("Product not found"); err.statusCode = 404; throw err;` — rather than each person writing their own custom error response format.

---

## `src/middleware/auth.middleware.js` — the bouncer

```js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorized, token is invalid or expired" });
  }
};

module.exports = protect;
```

- Checks for an `Authorization: Bearer <token>` header. Missing or wrong format → immediate `401`.
- `authHeader.split(" ")[1]` — the header looks like `"Bearer abc123"`; this grabs just `abc123`.
- `jwt.verify()` — confirms the token was really signed by this server (using `JWT_SECRET`) and hasn't expired. Fails → `401`.
- On success: `req.user = decoded` attaches the logged-in user's identity to the request, then `next()` lets it continue to the real controller.

**How your group uses this file:** any route that should require login imports this and adds it as a second argument, before the controller:

```js
router.get("/profile", protect, authController.getProfile);
```

Everything after `protect` in that line can safely assume `req.user` exists and is trustworthy.

---

## `src/utils/generateToken.js` — signs a token

```js
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

module.exports = generateToken;
```

Takes a small payload (minimally `{ id: user.id }`) and returns a signed token, expiring after `JWT_EXPIRES_IN` (7 days by default). Called exactly once, inside `auth.service.js`, right after a successful register or login.

⚠️ Must be saved as exactly `generateToken.js` (singular) — every teammate's planned `require("../utils/generateToken")` depends on that exact filename.

---

## `src/config/db.js` — the shared connection

This is the file every model file imports. Rather than re-explain every function here, the short version: it builds a connection config from `.env`, creates one lazy, reusable connection pool (nothing connects until something actually asks for it), and exports:

- **`query(sql, params)`** — the function every model file uses for basically everything. Runs a parameterized query, returns `result.recordset` (the array of rows).
- **`getTransaction()`** — for Ibrahim's order logic, where multiple inserts need to succeed or fail together.
- **`testConnection()`** — called once from `server.js` at startup.

**How your group uses this file:** every model file starts with:

```js
const { query } = require("../config/db");
```

Nobody writes their own separate database connection, ever — that's the entire point of this file existing.

---

## `database/schema.sql` — the table blueprint

This is a **SQL script**, not a JavaScript file — it's never `require()`'d by anything. It gets run manually, once, by each teammate, inside SSMS.

A few patterns worth understanding, since they repeat across all 14 tables:

- `IF NOT EXISTS (...) CREATE DATABASE gamers_store` — safe to re-run; won't error if the database already exists.
- `IDENTITY(1,1)` on every `id` column — SQL Server auto-generates these (1, 2, 3...); nobody ever inserts an id by hand.
- `FOREIGN KEY ... REFERENCES` — how tables link together (e.g. `order_items.order_id` points back to `orders.id`).
- `ON DELETE CASCADE` — if a parent row is deleted (say, a user), everything depending on it (their addresses, their wishlist items) is automatically cleaned up too, instead of being left orphaned.
- `GO` — a batch separator that only SSMS and `sqlcmd` understand. This is intentional: the script is meant to be pasted into SSMS and run there directly, not executed programmatically through `db.js` or the `mssql` npm package, which would choke on `GO`.

### How to actually run it (every teammate does this once)

1. Open **SSMS**, connect to your own local SQL Server instance.
2. Open a new query window, paste the entire contents of `schema.sql` in.
3. Click **Execute** (or press F5). This creates the `gamers_store` database and all 14 tables on **your own machine only** — this step is never shared through Git, only the script itself is.
4. In Object Explorer, expand **Databases → gamers_store → Tables** to confirm all 14 tables appear.

---

## `.env` and `.env.example` — the config

`.env.example` is the template that gets pushed to GitHub; `.env` is your real, local, never-pushed values. Every teammate copies the template and fills in their own values — critically, `DB_USER` and `DB_PASSWORD` come from a SQL Server login _you_ create yourself in SSMS (Security → Logins → New Login → SQL Server authentication → map it to `gamers_store` with the `db_owner` role), never copied from anyone else's `.env`.

---

## The MySQL → SQL Server change, and why it matters to every teammate

Your earliest build guide was written with MySQL patterns in mind. The actual `db.js` that got built talks to **SQL Server** instead, through the `mssql` npm package — and the two have real, incompatible differences in how a query is written. Every teammate writing a model file needs this corrected pattern, not the MySQL one:

**Old (MySQL) pattern — do not use:**

```js
const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
```

**Correct pattern for this project's actual `db.js`:**

```js
const { query } = require("../config/db");

const findById = async (id) => {
  const result = await query("SELECT * FROM products WHERE id = @id", { id });
  return result.recordset[0];
};
```

Three concrete differences to flag to the team:

1. **Named placeholders** (`@id`), not positional `?` marks.
2. **Params as a plain object** (`{ id }`), not an array (`[id]`).
3. **Results come back as `result.recordset`** (an array of row objects), not a `[rows]` destructured tuple.

This is the single most important correction to paste into your team's Discussion before Oreoluwa, David, Ibrahim, or John write their first model function — writing the MySQL pattern against this `db.js` will fail immediately.

---

## Quick-start checklist for a teammate pulling Phase 0 for the first time

1. `git pull` on `main` after Phase 0 is merged.
2. Install SQL Server Express (the engine) and SSMS (the GUI) if not already installed.
3. Run `database/schema.sql` inside SSMS, against your own local instance (steps above).
4. `cp .env.example .env`, then fill in `DB_INSTANCE` (or `DB_PORT`), `DB_USER`, `DB_PASSWORD` from your own SSMS login, and a random `JWT_SECRET`.
5. `npm install` in the `backend` folder.
6. `node server.js` — you're looking for `Connected to SQL Server` followed by `Server running on port 5000` in the console, with no errors.
7. Confirm `http://localhost:5000/api/health` responds in a browser or Postman before building anything.
