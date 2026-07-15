# gamers-store — Backend Build Guide (No Code, Pure Logic & Order)

## The One Rule Everything Else Follows

A request only ever flows in one direction: **route → controller → service → model → database.** A route's only job is deciding which controller function handles a URL. A controller's only job is reading the request and sending back a response — it never talks to the database directly. A service holds the actual business rules and is the only thing a controller is allowed to call. A model is the only file allowed to contain real SQL. Nobody skips a layer, and nothing ever calls backwards up the chain.

---

## Build Order — Who Starts First, and Why

### Phase 0 — Gerald, alone. Nobody else can meaningfully start until this is merged.

In this order specifically, because each piece depends on the one before it existing:

1. **`.env`** — without this, nothing else even knows how to reach the database or sign a token.
2. **`database/schema.sql`** — all six tables, written once, upfront. This isn't split across owners incrementally — the whole schema was already designed together, so one person running it once avoids four people editing the same SQL file at different times and colliding.
3. **`config/db.js`** — the shared connection pool. Every single model file on the team, no exceptions, imports this exact file rather than opening its own separate connection.
4. **`app.js` + `server.js`** — bare Express skeleton, enough to confirm the server actually starts and successfully connects to the database. Nothing feature-specific yet.
5. **`middleware/errorHandler.js`** and **`middleware/auth.middleware.js`** — built even though nothing uses them yet, because Oreoluwa's and Ibrahim's files will fail to even load once they try to import a middleware file that doesn't exist.
6. **`utils/generateToken.js`** — same reasoning; Oreoluwa's auth service needs this to exist before she can finish her login/register logic.
7. **`routes/index.js`** — created as an empty shell for now, just wired into `app.js`. This file gets edited repeatedly over the coming days as everyone else finishes their pieces — it's never really "done" until the whole backend is.

Once all seven exist and the server starts cleanly with no errors: push, PR, merge to `main`. Everyone else pulls this before touching anything.

### Phase 1 — Oreoluwa, David, Ibrahim, and John, mostly in parallel

Once Phase 0 is merged and pulled, these four are **not** strictly sequential to each other — but there are two real dependencies worth knowing up front, covered in detail further down:

- **David can start immediately and needs nothing from anyone else.**
- **John can start immediately and needs nothing from anyone else.**
- **Oreoluwa can start immediately** — her only dependency (Gerald's middleware and token helper) is already satisfied by Phase 0.
- **Ibrahim can start his files immediately too**, but the _order_ half of his work has a genuine soft dependency on David's product model being far enough along — explained fully below. His _wishlist_ half has no such dependency and can be finished independently, start to finish.

**Within each person's own feature, the internal build order is always the same, bottom-up:** model first, then service, then controller, then route, then register that route inside Gerald's `routes/index.js`, then test in Postman before considering it done.

The reasoning for building bottom-up: a controller that imports a service function which doesn't exist yet will crash the moment the file loads — so the layer being depended on always needs to exist first, even as a rough first draft.

### Phase 2 — Integration

Once all five people's routes are registered in `routes/index.js` and each has been individually tested in Postman, this phase is about connecting pieces to each other for real — swapping the frontend's mock service data for real fetch calls (a separate conversation, already flagged for later) and doing one full walkthrough of the site with a real database behind it instead of hardcoded arrays.

---

## The Complete Dependency Map

| File                            | Owner    | Imports                                        | Imported by                                                                                                        |
| ------------------------------- | -------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `config/db.js`                  | Gerald   | —                                              | every single model file, no exceptions                                                                             |
| `middleware/auth.middleware.js` | Gerald   | —                                              | `auth.routes.js` (profile endpoints only), `wishlist.routes.js` (all endpoints), `order.routes.js` (all endpoints) |
| `middleware/errorHandler.js`    | Gerald   | —                                              | `app.js` only                                                                                                      |
| `utils/generateToken.js`        | Gerald   | —                                              | `auth.service.js` only                                                                                             |
| `routes/index.js`               | Gerald   | every `*.routes.js` file from all 5 people     | `app.js`                                                                                                           |
| `app.js`                        | Gerald   | `routes/index.js`, `errorHandler.js`           | `server.js`                                                                                                        |
| `user.model.js`                 | Oreoluwa | `config/db.js`                                 | `auth.service.js`                                                                                                  |
| `auth.service.js`               | Oreoluwa | `user.model.js`, `generateToken.js`            | `auth.controller.js`                                                                                               |
| `product.model.js`              | David    | `config/db.js`                                 | `product.service.js`, **and `order.model.js` (Ibrahim)**                                                           |
| `product.service.js`            | David    | `product.model.js`                             | `product.controller.js`                                                                                            |
| `wishlist.model.js`             | Ibrahim  | `config/db.js`                                 | `wishlist.service.js`                                                                                              |
| `order.model.js`                | Ibrahim  | `config/db.js`, **`product.model.js` (David)** | `order.service.js`                                                                                                 |
| `contact.model.js`              | John     | `config/db.js`                                 | `contact.service.js`                                                                                               |

The two bolded lines are the real cross-team-member dependencies — everything else only ever depends on Gerald's foundation, never on a peer's feature.

---

## The Two Real Cross-Team Dependencies, Explained In Full

**1. Ibrahim's `order.model.js` needs David's `product.model.js`.**

Placing an order has to look up each product's _real, current_ price and confirm there's enough stock — never trusting a total number the browser sends, since that could be tampered with before it ever reaches the server. Rather than Ibrahim writing a second, separate way to fetch a product's price, his order model reuses David's already-built find-by-id function directly.

**Practical effect on sequencing:** Ibrahim can build and test his entire wishlist feature independently, start to finish, with zero dependency on David. But the _order_ feature's price/stock-check logic genuinely cannot be completed and correctly tested until David's `product.model.js` exists and is pulled into Ibrahim's branch. Until then, Ibrahim should build everything else in the order chain (the route, the controller, the basic structure of the service) and simply hold that one piece as the last thing to finish.

**2. Wishlist's product lookup is handled differently — worth knowing why.**

Getting a user's full wishlist needs full product details (name, price, image), not just a list of product IDs. Unlike the order case above, this doesn't need to import David's JavaScript file at all — it's handled as a single SQL JOIN, written directly inside `wishlist.model.js`, spanning both the `wishlist_items` and `products` tables in one query. The difference: a JOIN is the natural, single-query way to combine two related tables' data — reusing David's price-lookup logic is instead about reusing a specific piece of _business logic_ ("what does this product cost right now, and is it in stock"), which is exactly what importing his model function is for. Same shared database, two different, both-correct techniques depending on what's actually needed.

---

## Every File, By Owner — What Goes Inside, In Plain Terms

### Gerald

- **`config/db.js`** — creates one reusable connection to the database, reading credentials from environment variables rather than ever hardcoding them, and exports that single connection for everyone else to share.
- **`middleware/auth.middleware.js`** — runs before a protected route's controller ever gets a chance to execute. Reads the incoming request's authorization header, confirms a token was sent, verifies that token was genuinely issued by this server using the same secret it was signed with, and if valid, attaches the decoded user identity onto the request so every downstream step already knows who's asking — without ever trusting a user id if it were sent directly in a request body. If the token is missing or invalid, the request is stopped immediately with an unauthorized response, before it ever reaches a controller or the database.
- **`middleware/errorHandler.js`** — the final safety net, mounted last. Anything any controller anywhere hands off as an error lands here, gets logged, and gets turned into one consistent error response shape, so no individual controller needs its own custom error formatting.
- **`utils/generateToken.js`** — one small helper whose only job is producing a signed token from a small payload (a user's id, at minimum). Called only from inside Oreoluwa's auth service, right after a successful login or registration.
- **`routes/index.js`** — the switchboard. Every teammate's route file gets registered here under its own path. Nothing anyone builds is reachable — not even testable in Postman — until it's added to this file. This file gets revisited continually as each person finishes a piece; it's genuinely a shared, living file for the whole build phase.
- **`app.js`** — assembles the real Express application: turns on JSON body parsing so incoming request data can be read at all, turns on CORS so the frontend (running on a different port) is permitted to make requests to this server in the first place, mounts the combined routes, and mounts the error handler last of all.
- **`server.js`** — the true entry point. Loads the finished app and tells it to start listening for real traffic on a port.
- **`database/schema.sql`** — the one-time, complete table-creation script, covering all six tables in one place.

### Oreoluwa — Auth & Account

- **`user.model.js`** — the only file allowed to write SQL touching the `users` table. Needs a function to insert a brand-new user, a function to find a user by their email (used during login to check they exist and pull their stored password hash), a function to find a user by id (used for the profile page), and a function to update a user's editable fields.
- **`auth.service.js`** — where the real rules live. During registration: the incoming plain-text password must be transformed through a one-way hashing process before it's ever handed to the model to store — the real password itself is never saved anywhere. During login: pull the stored hash by email, then compare the submitted password against that hash using a matching one-way check (never by reversing the hash back into plain text — that's not how it works, and shouldn't be attempted). On a successful login or registration, call Gerald's token generator and hand back a token alongside the user's public info — the password hash itself must never be included in anything sent back to the frontend. `getProfile` and `updateProfile` operate on whichever user id the auth middleware already verified and attached to the request — never an id trusted from the request body itself.
- **`auth.controller.js`** — reads whatever arrived on the request (body for register/login, the verified user id for profile actions), hands it straight to the service, and converts whatever comes back into an HTTP response. No business rules of its own belong here.
- **`auth.routes.js`** — four endpoints. Register and login are fully public — anyone can reach them without a token. The two profile endpoints are wired through Gerald's auth middleware first, so only a genuinely logged-in user can reach them.

### David — Products (Shop, Product Detail, and the Weekly Discount Dropdown)

- **`product.model.js`** — all raw SQL for the `products` and `product_images` tables: fetch everything, fetch filtered by category, fetch a single product by id, search by name match, and a dedicated function for fetching only discounted products — this last one is what powers the new Weekly Discount dropdown in the header.
- **`product.service.js`** — decides what "all products" means when a category is or isn't specified, defines exactly what counts as a "deal" (most naturally: any product carrying the SALE badge), and defines what an empty or missing search term should sensibly return rather than erroring.
- **`product.controller.js`** — pulls query parameters (category, search term) and URL parameters (a specific product's id) off the request, calls the matching service function, and is the one place that returns a proper "not found" response when a single product lookup comes back empty.
- **`product.routes.js`** — every single endpoint here is public. No auth middleware appears anywhere in this file, since browsing products never requires being logged in.

### Ibrahim — Wishlist & Checkout

**Wishlist:**

- **`wishlist.model.js`** — every query here is scoped to a specific user id, always. The function that fetches a user's whole wishlist is written as one JOIN query spanning `wishlist_items` and `products` together, so the frontend receives complete product objects in a single trip to the database rather than bare ids needing a second lookup.
- **`wishlist.service.js`** — genuinely thin here; mostly passes straight through to the model, since "add this product for this user" and "remove this product for this user" don't carry much additional business logic beyond that.
- **`wishlist.controller.js`** — always reads the user id from the verified identity the auth middleware attached to the request, never from anything the client itself claims in a request body.
- **`wishlist.routes.js`** — all three endpoints run through Gerald's auth middleware, since a wishlist is inherently personal, user-specific data.

**Checkout / Orders — the single most involved piece of logic in the entire backend:**

- **`order.model.js`** — raw SQL for the `orders` and `order_items` tables, and this is the file that reaches into David's `product.model.js` to look up each item's true current price and current stock level at the exact moment an order is being placed.
- **`order.service.js`** — receives a list of items (each a product id and a quantity) along with a shipping address. For every single item, it looks up the real, current price and confirms enough stock actually exists — and if even one item fails that check, the entire order is refused rather than partially processed. The order's true total is calculated here, server-side, by summing these freshly looked-up real prices — any total figure the frontend might have sent along is deliberately ignored, since a number coming from the browser could always have been altered before the request was ever sent. Only once every item passes does it create the order record, followed by one line-item record per product, each one referencing the new order's id.
- **`order.controller.js`** — reads the verified user id off the request, reads the item list and shipping address from the request body, hands off to the service, returns the confirmation.
- **`order.routes.js`** — both endpoints run through the auth middleware, since placing or viewing an order is always tied to a specific, known customer.

### John — Contact

- **`contact.model.js`** — one straightforward function: insert a new row into `contact_messages`.
- **`contact.service.js`** — the one place validation happens: confirms name, email, and message are all genuinely present and non-empty before anything is allowed to reach the database.
- **`contact.controller.js`** — reads the request body, hands to the service, returns success or failure.
- **`contact.routes.js`** — fully public, no auth middleware at all — anyone visiting the site should be able to send a message without needing an account.

---

## Practical Notes For Getting Unblocked Without Waiting Idle

- **Ibrahim doesn't need to wait for Oreoluwa's login to be fully finished before testing his protected routes.** Once Gerald's `generateToken` helper exists, Ibrahim can generate himself a throwaway test token directly (a few lines run once, not part of the real app) purely to get a working "Bearer" value to paste into Postman while building — no need to sit idle waiting on someone else's feature.
- **`routes/index.js` will get touched by multiple people over the coming days.** Before opening a PR that adds a new line to this specific file, say so in the team Discussion first — this avoids two people's PRs both trying to edit the same lines at the same time and creating an avoidable merge conflict.
- **Test every single endpoint directly in Postman or Thunder Client before assuming it works** — confirm the exact shape of what comes back matches what the frontend's service file is already expecting to receive, since the frontend was written first against a predicted shape.

---

## Final Checklist Before Calling a Feature "Done"

For every person, every feature: model built and manually queried once to confirm it returns real rows → service logic reviewed against the rules described above → controller returns sensible status codes (200 for success, 404 when something specific isn't found, 401 when auth fails) → route registered in Gerald's `routes/index.js` → tested directly in Postman with a real request → only then considered ready to eventually connect to its matching frontend service file.
