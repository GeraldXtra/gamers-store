# gamers-store Backend — Complete Project Structure Guide

This is the full reference for what every folder and file in the backend is for, what goes inside each one, who builds it, and how everything connects. Read this alongside `02-routing-guide.md` (what each URL does and who calls it) and `03-phase0-code-explained.md` (line-by-line explanation of what's already built).

## The one rule that shapes every folder below

Every request flows in exactly one direction:

**route → controller → service → model → database**

- A **route** file's only job is matching a URL + method to a controller function. It never contains logic.
- A **controller**'s only job is reading the request and shaping the response. It never touches SQL.
- A **service** holds the real business rules. It's the only thing a controller is allowed to call.
- A **model** is the only place allowed to contain real SQL. Nothing outside a model ever writes a query.

Nobody skips a layer. Nothing calls backwards up the chain (a model never calls a service, a service never calls a controller). Once you know this, every folder below is just "which layer does this hold."

---

## Root level (outside `src/`)

| File           | Owner                    | Purpose                                                                                                                                                                                       |
| -------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server.js`    | Gerald                   | The true entry point. Loads the finished app, connects to the database via `testConnection()`, then starts listening for traffic. This is the file you actually run (`node server.js`).       |
| `.env`         | Gerald (never pushed)    | Real secrets and local config — your own SQL Server login, your JWT secret. Every teammate has their own, different `.env`.                                                                   |
| `.env.example` | Gerald (pushed)          | The blank template showing which keys exist. Every teammate copies this to their own `.env` and fills it in.                                                                                  |
| `.gitignore`   | Gerald                   | Tells Git which files/folders to never track — must include `.env` and `node_modules` at minimum.                                                                                             |
| `package.json` | Gerald (grows over time) | Lists every npm package the project depends on (`express`, `cors`, `mssql`, `jsonwebtoken`, `dotenv`, and later `bcrypt`). Anyone can add a new dependency here when their feature needs one. |

---

## `src/app.js`

**Owner:** Gerald. **Layer:** assembly — sits above every folder below it, wiring them together.

This is where the actual Express application object gets built. It turns on CORS (so the frontend, on a different port, is allowed to call this server), turns on JSON/form body parsing (so incoming request data can be read at all), mounts every route under `/api`, and mounts the 404 handler and `errorHandler` last. Nothing feature-specific lives here — it only assembles pieces built elsewhere.

**Imports:** `routes/index.js`, `middleware/errorHandler.js`
**Imported by:** `server.js` only

---

## `src/config/` — the database connection

### `db.js`

**Owner:** Gerald. **Layer:** infrastructure, sits below every model.

Creates one shared, reusable SQL Server connection pool, reading credentials from `.env` rather than ever hardcoding them. Exports a `query()` helper (safe, parameterized SQL), a `getTransaction()` helper (for Ibrahim's order logic, where multiple inserts must succeed or fail together), and `testConnection()` (called once from `server.js` to confirm the database is reachable before the server accepts traffic).

**Imports:** the `mssql` npm package only
**Imported by:** every single model file, no exceptions — `user.model.js`, `product.model.js`, `wishlist.model.js`, `order.model.js`, `contact.model.js`

---

## `src/database/` — the schema

### `schema.sql`

**Owner:** Gerald, written once upfront.

The complete, one-time table-creation script — all 14 tables (`users`, `categories`, `products`, `product_images`, `user_addresses`, `wishlist_items`, `cart_items`, `orders`, `order_items`, `payments`, `reviews`, `contact_messages`, `newsletter_subscribers`, `store_locations`). This file is never imported by any JavaScript file — it's not code, it's a one-time setup script every teammate runs manually inside SSMS against their own local SQL Server. See `03-phase0-code-explained.md` for exactly how.

---

## `src/middleware/` — code that runs _before_ a controller

Middleware sits between a route being matched and its controller actually running. Both files here are infrastructure Gerald builds in Phase 0, even though nothing uses them yet at that point — because the moment anyone tries to `require` a middleware file that doesn't exist, their file crashes on load.

### `auth.middleware.js`

**Owner:** Gerald. The bouncer.

Runs in front of any route that requires a logged-in user. Reads the `Authorization: Bearer <token>` header, verifies the token was genuinely signed by this server (using `JWT_SECRET`), and if valid, attaches the decoded identity onto `req.user` so every downstream layer already knows who's asking — without ever trusting a user id sent directly in a request body (that could be faked). If the token is missing or invalid, the request is stopped immediately with a `401`, before it ever reaches a controller or the database.

**Imports:** `jsonwebtoken` (npm package)
**Imported by:** `auth.routes.js` (profile + address endpoints only — register/login stay public), `wishlist.routes.js` (every endpoint), `order.routes.js` (every endpoint), `product.routes.js` (only the review-submission endpoint)

### `errorHandler.js`

**Owner:** Gerald. The final safety net.

Mounted last in `app.js`. Anything any controller anywhere throws or passes to `next(err)` lands here, gets logged to the console, and gets turned into one consistent JSON error shape — so no individual controller needs its own custom error formatting. Only shows the technical stack trace when `NODE_ENV=development`.

**Imports:** nothing
**Imported by:** `app.js` only

---

## `src/utils/` — small, reusable helpers

### `generateToken.js`

**Owner:** Gerald.

One small function: takes a payload (minimally `{ id: user.id }`) and returns a signed JWT, using `JWT_SECRET` and `JWT_EXPIRES_IN` from `.env`. This is the "wristband machine" — it stamps proof of identity after a successful login or registration.

**Imports:** `jsonwebtoken` (npm package)
**Imported by:** `auth.service.js` only, called right after a successful login or registration

⚠️ **Filename note:** this must be named exactly `generateToken.js` (singular) — every doc and every teammate's planned `require()` statement uses the singular form.

---

## `src/models/` — the only files allowed to touch SQL

Every model file follows the same shape: functions that run one parameterized query each, using `query()` from `config/db.js`, and return plain data to whatever service called them.

### `user.model.js` — Owner: Oreoluwa

Touches the `users` table (and `user_addresses`, since Oreoluwa owns both). Needs: insert a new user, find a user by email (login), find a user by id (profile), update a user's editable fields, plus address CRUD functions.
**Imports:** `config/db.js` · **Imported by:** `auth.service.js`

### `product.model.js` — Owner: David

Touches `products`, `product_images`, and `reviews`. Needs: fetch all products, fetch by category, fetch one by id, search by name, fetch only discounted products (powers the Weekly Discount dropdown), plus review read/insert functions.
**Imports:** `config/db.js` · **Imported by:** `product.service.js`, **and `order.model.js` (Ibrahim)**

### `wishlist.model.js` — Owner: Ibrahim

Touches `wishlist_items`, joined with `products`. Every query here is scoped to a specific `user_id`. The "get my wishlist" function is written as one JOIN query spanning both tables, so the frontend gets full product details in a single trip rather than bare ids needing a second lookup.
**Imports:** `config/db.js` · **Imported by:** `wishlist.service.js`

### `order.model.js` — Owner: Ibrahim

Touches `orders`, `order_items`, and `payments`. This is the one model file that reaches into a teammate's other model — it imports David's `product.model.js` directly to look up each item's real, current price and stock level at the exact moment an order is placed, rather than trusting anything the browser sent.
**Imports:** `config/db.js`, `product.model.js` (David) · **Imported by:** `order.service.js`

### `contact.model.js` — Owner: John

Touches `contact_messages` and `newsletter_subscribers`. Two simple insert functions: one new contact message, one new newsletter subscription.
**Imports:** `config/db.js` · **Imported by:** `contact.service.js`

---

## `src/services/` — where the real business rules live

A service is the only thing a controller may call, and the only place decisions get made — what counts as a "deal," how a password gets hashed, how an order total gets calculated. Services call models; they never touch SQL directly and never format an HTTP response themselves.

### `auth.service.js` — Owner: Oreoluwa

Registration: hashes the incoming plain-text password (one-way, via `bcrypt`) before it ever reaches the model — the real password is never stored anywhere. Login: pulls the stored hash by email, compares the submitted password against it using a matching one-way check. On success, calls `generateToken.js` and returns a token plus the user's public info — the password hash itself never gets sent back to the frontend. `getProfile`/`updateProfile`/address functions always operate on the user id the auth middleware already verified, never an id trusted from the request body.
**Imports:** `user.model.js`, `utils/generateToken.js`, `bcrypt` (npm package) · **Imported by:** `auth.controller.js`

### `product.service.js` — Owner: David

Decides what "all products" means with or without a category filter, defines exactly what counts as a "deal" (a product carrying the `SALE` badge), and defines sensible behavior for an empty search term. Also holds review logic (e.g. preventing a user from reviewing the same product twice, matching the database's unique constraint).
**Imports:** `product.model.js` · **Imported by:** `product.controller.js`

### `wishlist.service.js` — Owner: Ibrahim

Thin by design — mostly passes straight through to the model, since "add this product for this user" and "remove this product for this user" don't carry much extra logic.
**Imports:** `wishlist.model.js` · **Imported by:** `wishlist.controller.js`

### `order.service.js` — Owner: Ibrahim

The most involved file in the backend. Receives a list of `{ productId, quantity }` items plus a shipping address. For every item: looks up the real current price and confirms enough stock exists — if even one item fails, the _entire_ order is refused, nothing partial is created. The order total is calculated here server-side by summing these freshly looked-up real prices; any total the frontend sent is ignored, since a browser-supplied number can always be tampered with. Only once every item passes does it create the order row, then one `order_items` row per product, then a `payments` row recording the (currently mocked) payment attempt — all inside one transaction via `getTransaction()` from `db.js`, so a failure partway through rolls everything back instead of leaving a half-created order.
**Imports:** `order.model.js` · **Imported by:** `order.controller.js`

### `contact.service.js` — Owner: John

The one place validation happens: confirms name, email, and message are genuinely present and non-empty (for contact messages), or that an email is present and valid-looking (for newsletter signups), before anything reaches the database.
**Imports:** `contact.model.js` · **Imported by:** `contact.controller.js`

---

## `src/controllers/` — reads the request, shapes the response

A controller is deliberately "dumb" — no business rules, no SQL. It pulls whatever it needs off the request (`req.body`, `req.params`, `req.query`, or `req.user` from the auth middleware), calls exactly one service function, and turns the result into an HTTP response with the right status code.

### `auth.controller.js` — Owner: Oreoluwa

Handles register, login, get/update profile, and address CRUD. Reads `req.body` for register/login/address-create, reads `req.user.id` (set by the middleware) for anything profile- or address-related — never a user id from the body itself.
**Imports:** `auth.service.js` · **Imported by:** `auth.routes.js`

### `product.controller.js` — Owner: David

Handles listing, filtering, searching, single-product lookup, and reviews. Pulls `category`/`search` off `req.query`, a product id off `req.params`, and is the one place that returns a proper `404` when a single product lookup comes back empty.
**Imports:** `product.service.js` · **Imported by:** `product.routes.js`

### `wishlist.controller.js` — Owner: Ibrahim

Always reads the user id from `req.user` (set by the middleware), never from anything the client claims in the request body — a wishlist is inherently tied to whoever is actually logged in.
**Imports:** `wishlist.service.js` · **Imported by:** `wishlist.routes.js`

### `order.controller.js` — Owner: Ibrahim

Reads the verified user id off `req.user`, reads the item list and shipping address off `req.body`, hands off to the service, returns the order confirmation or the order history list.
**Imports:** `order.service.js` · **Imported by:** `order.routes.js`

### `contact.controller.js` — Owner: John

Reads `req.body`, hands to the service, returns a success/failure message. Handles both the contact form and the newsletter signup.
**Imports:** `contact.service.js` · **Imported by:** `contact.routes.js`

---

## `src/routes/` — the switchboard

A route file only ever does one thing per line: match a URL + HTTP method, optionally require the auth middleware first, then hand off to one controller function. See `02-routing-guide.md` for the full endpoint-by-endpoint breakdown, page mapping, and database table for every route below.

### `index.js` — Owner: Gerald

The master switchboard. Every other `*.routes.js` file gets `require`'d and mounted here under its own path prefix (e.g. `router.use("/auth", authRoutes)`). Also holds the small standalone routes with no dedicated feature file: `/health`, `/categories`, `/store-locations`. Nothing anyone builds is reachable — not even testable in Postman — until it's registered here. This file is genuinely never "done" until the whole backend is; multiple people will touch it over the build.
**Imports:** every `*.routes.js` file · **Imported by:** `app.js`

### `auth.routes.js` — Owner: Oreoluwa

Register and login are fully public. Profile (GET/PUT) and all address endpoints are wired through `auth.middleware.js` first.
**Imports:** `auth.controller.js`, `middleware/auth.middleware.js`

### `product.routes.js` — Owner: David

Product browsing, search, and the deals endpoint are all public — no middleware. The single review-submission endpoint (`POST /:id/reviews`) is the one route in this file that needs `auth.middleware.js`, since you must be logged in to leave a review.
**Imports:** `product.controller.js`, `middleware/auth.middleware.js` (review POST only)

### `wishlist.routes.js` — Owner: Ibrahim

Every endpoint requires `auth.middleware.js` — a wishlist is always personal, user-specific data.
**Imports:** `wishlist.controller.js`, `middleware/auth.middleware.js`

### `order.routes.js` — Owner: Ibrahim

Every endpoint requires `auth.middleware.js` — placing or viewing an order is always tied to a known, logged-in customer.
**Imports:** `order.controller.js`, `middleware/auth.middleware.js`

### `contact.routes.js` — Owner: John

Fully public, no middleware anywhere — anyone visiting the site should be able to send a message or subscribe without an account.
**Imports:** `contact.controller.js`

---

## Build order — condensed

**Phase 0 (Gerald alone):** `.env` → `database/schema.sql` → `config/db.js` → `app.js` + `server.js` → both middleware files → `utils/generateToken.js` → `routes/index.js` (empty shell). Once the server starts cleanly and connects to the database: push, PR, merge to `main`. This is done — see `03-phase0-code-explained.md`.

**Phase 1 (Oreoluwa, David, Ibrahim, John — mostly parallel):** everyone pulls `main`, then builds their own feature **bottom-up**: model → service → controller → route → register the route in `routes/index.js` → test in Postman. Bottom-up because a controller importing a service function that doesn't exist yet crashes the moment the file loads — the layer being depended on always needs to exist first, even as a rough draft.

- David and John can start immediately, no dependencies on anyone.
- Oreoluwa can start immediately — her only dependency (Gerald's middleware + token helper) is already satisfied.
- Ibrahim can start immediately too. His **wishlist** half has zero dependency and can be finished start to finish. His **order** half genuinely cannot be completed until David's `product.model.js` exists — build everything else in that chain first (route, controller, service structure) and hold the price/stock-check piece as the very last thing to finish.

**Phase 2 (Integration):** once all five people's routes are registered and individually tested in Postman, swap the frontend's mock data for real fetch calls, then do one full walkthrough of the site against the real database.

---

## Complete dependency map

| File                            | Owner    | Imports                                        | Imported by                                                                                                                          |
| ------------------------------- | -------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `config/db.js`                  | Gerald   | `mssql`                                        | every model file, no exceptions                                                                                                      |
| `middleware/auth.middleware.js` | Gerald   | `jsonwebtoken`                                 | `auth.routes.js` (profile/address only), `product.routes.js` (review POST only), `wishlist.routes.js` (all), `order.routes.js` (all) |
| `middleware/errorHandler.js`    | Gerald   | —                                              | `app.js` only                                                                                                                        |
| `utils/generateToken.js`        | Gerald   | `jsonwebtoken`                                 | `auth.service.js` only                                                                                                               |
| `routes/index.js`               | Gerald   | every `*.routes.js`                            | `app.js`                                                                                                                             |
| `app.js`                        | Gerald   | `routes/index.js`, `errorHandler.js`           | `server.js`                                                                                                                          |
| `server.js`                     | Gerald   | `app.js`, `config/db.js`                       | — (entry point)                                                                                                                      |
| `user.model.js`                 | Oreoluwa | `config/db.js`                                 | `auth.service.js`                                                                                                                    |
| `auth.service.js`               | Oreoluwa | `user.model.js`, `generateToken.js`, `bcrypt`  | `auth.controller.js`                                                                                                                 |
| `auth.controller.js`            | Oreoluwa | `auth.service.js`                              | `auth.routes.js`                                                                                                                     |
| `product.model.js`              | David    | `config/db.js`                                 | `product.service.js`, **and `order.model.js` (Ibrahim)**                                                                             |
| `product.service.js`            | David    | `product.model.js`                             | `product.controller.js`                                                                                                              |
| `product.controller.js`         | David    | `product.service.js`                           | `product.routes.js`                                                                                                                  |
| `wishlist.model.js`             | Ibrahim  | `config/db.js`                                 | `wishlist.service.js`                                                                                                                |
| `wishlist.service.js`           | Ibrahim  | `wishlist.model.js`                            | `wishlist.controller.js`                                                                                                             |
| `wishlist.controller.js`        | Ibrahim  | `wishlist.service.js`                          | `wishlist.routes.js`                                                                                                                 |
| `order.model.js`                | Ibrahim  | `config/db.js`, **`product.model.js` (David)** | `order.service.js`                                                                                                                   |
| `order.service.js`              | Ibrahim  | `order.model.js`                               | `order.controller.js`                                                                                                                |
| `order.controller.js`           | Ibrahim  | `order.service.js`                             | `order.routes.js`                                                                                                                    |
| `contact.model.js`              | John     | `config/db.js`                                 | `contact.service.js`                                                                                                                 |
| `contact.service.js`            | John     | `contact.model.js`                             | `contact.controller.js`                                                                                                              |
| `contact.controller.js`         | John     | `contact.service.js`                           | `contact.routes.js`                                                                                                                  |

The two bolded lines are the only real cross-teammate dependencies. Everything else only ever depends on Gerald's Phase 0 foundation, never on a peer's feature.
