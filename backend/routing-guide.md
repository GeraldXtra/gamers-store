# gamers-store Backend — Complete Routing Guide

Every endpoint in the backend, in one place: what it does, whether it needs login, which files handle it, which database table(s) it touches, and — the part that's easy to lose track of — which frontend page(s) actually call it and why. Read this alongside `01-project-structure-guide.md` for the folder/file explanations.

## How to read this document

A route is passive — it just sits there waiting. It's the **frontend page** that decides to call it. So for every route below, don't think "which page owns this," think "which page(s) need this data, and when do they need it." Some routes are called from exactly one page. Some are called from two, for genuinely different reasons (see Addresses, below).

Any route with `:something` in its path is almost always called from a **detail** page for that one specific thing — `products/:id` from ProductDetail, `orders/:id` from an order's detail view. Routes without an `:id` are usually **list** routes, called from whatever page shows a list of things — Shop, Wishlist, order history.

---

## Gerald — Foundational / shared

| Route                  | Method | Auth | Handled by                                                                                  |
| ---------------------- | ------ | ---- | ------------------------------------------------------------------------------------------- |
| `/api/health`          | GET    | No   | inline in `routes/index.js` — no controller/service/model, just confirms the API is running |
| `/api/categories`      | GET    | No   | needs a home — see note below                                                               |
| `/api/store-locations` | GET    | No   | needs a home — see note below                                                               |

**`/api/health`** — Called by nobody in the real frontend. This is a developer/ops check — you'd hit it manually in a browser or Postman to confirm the server is alive. No database table involved.

**`/api/categories`** — Reads from the `categories` table. Called from **Header** (the category dropdown, on every page) and **Shop** (the filter sidebar). ⚠️ Real gap: the file tree has no dedicated `category.routes.js` / `.controller.js` / `.model.js`. Since it's small and single-purpose, the simplest fix is writing it directly inside `routes/index.js` with its own tiny inline query (same pattern as `/health`). Decide this before David starts on Shop's filters — he'll need this endpoint to exist.

**`/api/store-locations`** — Reads from the `store_locations` table. Called only from **Store Locator**. Same file-ownership gap as categories — the DB design doc already flagged this could go to Kingsley now that there's an actual table for him to own, or stay with Gerald.

---

## Oreoluwa — Auth & Account

| Route                     | Method | Auth | Files                                                                         |
| ------------------------- | ------ | ---- | ----------------------------------------------------------------------------- |
| `/api/auth/register`      | POST   | No   | `auth.routes.js` → `auth.controller.js` → `auth.service.js` → `user.model.js` |
| `/api/auth/login`         | POST   | No   | same chain                                                                    |
| `/api/auth/profile`       | GET    | Yes  | same chain                                                                    |
| `/api/auth/profile`       | PUT    | Yes  | same chain                                                                    |
| `/api/auth/addresses`     | GET    | Yes  | same chain                                                                    |
| `/api/auth/addresses`     | POST   | Yes  | same chain                                                                    |
| `/api/auth/addresses/:id` | PUT    | Yes  | same chain                                                                    |
| `/api/auth/addresses/:id` | DELETE | Yes  | same chain                                                                    |

**Tables touched:** `users` (register, login, profile), `user_addresses` (address endpoints).

**Register / Login** — Called from **SignUp** and **Login** pages respectively, once, on form submit. Both are public — no token exists yet at this point, since the whole point is to get one.

**Profile (GET/PUT)** — Called from **AccountSettings**: once on page load (GET, to pre-fill the form) and once on save (PUT).

**Addresses (all four)** — Called from **two different pages, for two different reasons**, not a mistake:

- **AccountSettings** — the "manage my addresses" view: full list, with edit/delete.
- **Checkout** — the "pick a shipping address" step, so a returning customer doesn't retype it every purchase. Checkout also needs the POST endpoint for a first-time buyer adding a new address mid-checkout.

Addresses deliberately live inside `auth.routes.js` rather than their own file — Oreoluwa already owns AccountSettings, and an address is account data.

---

## David — Products (Shop, Product Detail, Weekly Discount Dropdown)

| Route                       | Method | Auth | Files                                                                                     |
| --------------------------- | ------ | ---- | ----------------------------------------------------------------------------------------- |
| `/api/products`             | GET    | No   | `product.routes.js` → `product.controller.js` → `product.service.js` → `product.model.js` |
| `/api/products/deals`       | GET    | No   | same chain                                                                                |
| `/api/products/search`      | GET    | No   | same chain                                                                                |
| `/api/products/:id`         | GET    | No   | same chain                                                                                |
| `/api/products/:id/reviews` | GET    | No   | same chain                                                                                |
| `/api/products/:id/reviews` | POST   | Yes  | same chain, plus `auth.middleware.js`                                                     |

**Tables touched:** `products`, `product_images` (all routes), `reviews` (the two `/reviews` routes).

**`/api/products`** — Called from **Shop** (with category/sort query params from the filter UI) and from **Home**'s several sections (FeaturedProducts, TrendingProducts, TopRatedProducts, RecentlyAdded) — each likely calls this same endpoint with different query params or sort order, rather than needing four separate endpoints.

**`/api/products/deals`** — Called only from **Header's WeeklyDiscountDropdown**.

**`/api/products/search`** — Called from wherever the search input actually lives (Shop's search bar, or Header if search is global).

**`/api/products/:id`** — Called from **ProductDetail** on page load, to fetch the one product being viewed.

**`/api/products/:id/reviews` (GET/POST)** — Both called from **ProductDetail**, same page as the product itself: GET loads the reviews list below the product info, POST is the "leave a review" form at the bottom (only shown/enabled if logged in).

---

## Ibrahim — Wishlist & Checkout

### Wishlist

| Route                      | Method | Auth | Files                                                                                         |
| -------------------------- | ------ | ---- | --------------------------------------------------------------------------------------------- |
| `/api/wishlist`            | GET    | Yes  | `wishlist.routes.js` → `wishlist.controller.js` → `wishlist.service.js` → `wishlist.model.js` |
| `/api/wishlist`            | POST   | Yes  | same chain                                                                                    |
| `/api/wishlist/:productId` | DELETE | Yes  | same chain                                                                                    |

**Tables touched:** `wishlist_items`, joined with `products` for the GET.

**GET** — Called from the **Wishlist** page, loading the full list.
**POST / DELETE** — Called from **two different places**: the heart icon on **ProductCard** (used across Home, Shop, and anywhere else a product is shown as a card) _and_ from the **Wishlist page itself** (removing an item you're currently looking at). Same two endpoints, multiple call sites.

### Orders / Checkout

| Route             | Method | Auth | Files                                                                                                    |
| ----------------- | ------ | ---- | -------------------------------------------------------------------------------------------------------- |
| `/api/orders`     | POST   | Yes  | `order.routes.js` → `order.controller.js` → `order.service.js` → `order.model.js` (+ `product.model.js`) |
| `/api/orders`     | GET    | Yes  | same chain                                                                                               |
| `/api/orders/:id` | GET    | Yes  | same chain                                                                                               |

**Tables touched:** `orders`, `order_items`, `payments` (all written together, in one transaction), plus a read-only lookup into `products` for real-time price/stock.

**POST** — Called from **Checkout**'s "Place Order" button. Sends the item list + shipping address; the server calculates the real total itself and ignores whatever total the frontend displayed, since a browser-supplied number can be tampered with before the request arrives.

**GET (list)** — ⚠️ **Real gap, needs a team decision.** There's no existing page in your frontend structure for "my past orders." Two options:

1. A brand-new page (e.g. `OrderHistory.jsx`), linked from account navigation.
2. A new tab/section inside **AccountSettings**, alongside Profile and Addresses — the more standard e-commerce pattern, and avoids building a whole new page + route entry for what's really one more account sub-section.

Recommend deciding this before Ibrahim finishes this endpoint, since the response shape may differ slightly (a full page can paginate more elaborately than a tab).

**GET `:id`** — Called from wherever the order history list above links to — clicking one past order to see its full line-item detail.

---

## John — Contact & Newsletter

| Route             | Method | Auth | Files                                                                                     |
| ----------------- | ------ | ---- | ----------------------------------------------------------------------------------------- |
| `/api/contact`    | POST   | No   | `contact.routes.js` → `contact.controller.js` → `contact.service.js` → `contact.model.js` |
| `/api/newsletter` | POST   | No   | same chain                                                                                |

**Tables touched:** `contact_messages` (first route), `newsletter_subscribers` (second route). Both live in John's existing `contact.*` files rather than getting their own separate set — there's no `newsletter.model.js` in the file tree, so this is intentional file-sharing, not a gap.

**`/api/contact`** — Called from **ContactUs** and **GetInTouch** — both pages submit to the same endpoint, since they're the same underlying feature (a message + sender info) shown in two places.

**`/api/newsletter`** — Called from **Footer**, which appears on every page — the signup input is shared site-wide, not tied to one page.

---

## Routes with no backend involvement at all

Worth stating explicitly so nobody goes looking for these: **cart** has no route and no dedicated table in active use (beyond the optional, currently-unused `cart_items`) — it lives entirely in the frontend's `CartContext` until checkout. **FAQ, Terms & Conditions, Pricing Plans** are fully static frontend content with no backend behind them at all.

---

## Every route, one final table

| #   | Route                       | Method | Auth | Table(s)                                               | Frontend page(s)                |
| --- | --------------------------- | ------ | ---- | ------------------------------------------------------ | ------------------------------- |
| 1   | `/api/health`               | GET    | No   | —                                                      | none (dev check only)           |
| 2   | `/api/categories`           | GET    | No   | `categories`                                           | Header, Shop                    |
| 3   | `/api/store-locations`      | GET    | No   | `store_locations`                                      | Store Locator                   |
| 4   | `/api/auth/register`        | POST   | No   | `users`                                                | SignUp                          |
| 5   | `/api/auth/login`           | POST   | No   | `users`                                                | Login                           |
| 6   | `/api/auth/profile`         | GET    | Yes  | `users`                                                | AccountSettings                 |
| 7   | `/api/auth/profile`         | PUT    | Yes  | `users`                                                | AccountSettings                 |
| 8   | `/api/auth/addresses`       | GET    | Yes  | `user_addresses`                                       | AccountSettings, Checkout       |
| 9   | `/api/auth/addresses`       | POST   | Yes  | `user_addresses`                                       | AccountSettings, Checkout       |
| 10  | `/api/auth/addresses/:id`   | PUT    | Yes  | `user_addresses`                                       | AccountSettings                 |
| 11  | `/api/auth/addresses/:id`   | DELETE | Yes  | `user_addresses`                                       | AccountSettings                 |
| 12  | `/api/products`             | GET    | No   | `products`, `product_images`                           | Shop, Home                      |
| 13  | `/api/products/deals`       | GET    | No   | `products`                                             | Header (WeeklyDiscountDropdown) |
| 14  | `/api/products/search`      | GET    | No   | `products`                                             | Shop (or Header)                |
| 15  | `/api/products/:id`         | GET    | No   | `products`, `product_images`                           | ProductDetail                   |
| 16  | `/api/products/:id/reviews` | GET    | No   | `reviews`                                              | ProductDetail                   |
| 17  | `/api/products/:id/reviews` | POST   | Yes  | `reviews`                                              | ProductDetail                   |
| 18  | `/api/wishlist`             | GET    | Yes  | `wishlist_items`, `products`                           | Wishlist                        |
| 19  | `/api/wishlist`             | POST   | Yes  | `wishlist_items`                                       | ProductCard, Wishlist           |
| 20  | `/api/wishlist/:productId`  | DELETE | Yes  | `wishlist_items`                                       | ProductCard, Wishlist           |
| 21  | `/api/orders`               | POST   | Yes  | `orders`, `order_items`, `payments`, `products` (read) | Checkout                        |
| 22  | `/api/orders`               | GET    | Yes  | `orders`                                               | Order history (page/tab — TBD)  |
| 23  | `/api/orders/:id`           | GET    | Yes  | `orders`, `order_items`                                | Order detail (linked from #22)  |
| 24  | `/api/contact`              | POST   | No   | `contact_messages`                                     | ContactUs, GetInTouch           |
| 25  | `/api/newsletter`           | POST   | No   | `newsletter_subscribers`                               | Footer                          |
