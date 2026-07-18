# gamers-store — Complete Database Design (Final)

This replaces the earlier schema drafts entirely — treat this as the authoritative version. Nobody's run the old one yet, so there's nothing to migrate away from.

## What Changed From the Earlier Draft, and Why

Going through the whole site page by page surfaced real gaps:

- **`products.category` was a raw text column.** Upgraded to a proper `categories` table with a foreign key — avoids typos causing "Gaming Mouse" and "gaming mouse" to silently become two different categories, and gives Header's dropdown, Hero's category bar, and CategoryIcons one single, manageable source of truth instead of hardcoded lists.
- **The Footer's newsletter signup had no table at all.** Genuine miss — it's a real, visible input on a real page. Added.
- **No table for saved addresses**, despite AccountSettings needing somewhere to store them, and Checkout needing somewhere to pull from.
- **No reviews table**, despite ProductCard's star-rating space and PDP naturally needing one — standard for any e-commerce database even if the UI for it comes later.
- **No payments table** — Checkout needs somewhere to record a payment attempt even while it's mocked.
- **Store Locator had nothing** — covered above.

## Two Genuinely Optional Additions — Your Call

- **`cart_items`** — right now the cart lives entirely in `CartContext`, gone on refresh. A table here would let a logged-in user's cart survive across devices and sessions. Not required for the site to work, but worth knowing it's the standard real-world approach.
- **Pricing Plans** — honestly unclear what this page is meant to represent on a physical-goods store (a membership/loyalty tier system? shipping speed options? something else?). I don't want to invent a table for content I don't actually understand the meaning of. Tell me what it's supposed to show and I'll design the right table — for now it stays as static frontend content.

---

## Every Table, What It's For

| Table                    | Purpose                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| `users`                  | Accounts — Login/SignUp/AccountSettings                                   |
| `categories`             | Canonical category list — feeds Header, Hero, CategoryIcons, Shop filters |
| `products`               | The catalog                                                               |
| `product_images`         | Multiple images per product (powers ProductCard's chevron switching)      |
| `user_addresses`         | Saved shipping addresses — AccountSettings, reused at Checkout            |
| `wishlist_items`         | Wishlist page                                                             |
| `cart_items`             | _(optional)_ persisted cart, see above                                    |
| `orders`                 | One row per placed order                                                  |
| `order_items`            | Line items per order                                                      |
| `payments`               | Payment attempt/status per order                                          |
| `reviews`                | Product ratings/comments                                                  |
| `contact_messages`       | Contact Us + Get In Touch submissions                                     |
| `newsletter_subscribers` | Footer signup                                                             |
| `store_locations`        | Store Locator page                                                        |

---

## Complete SQL

```sql
CREATE DATABASE IF NOT EXISTS gamers_store;
USE gamers_store;

-- ===== Users & Accounts =====

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  label VARCHAR(50),
  full_name VARCHAR(150),
  phone VARCHAR(30),
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Nigeria',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===== Catalog =====

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  badge VARCHAR(20),
  description TEXT,
  stock_qty INT DEFAULT 0,
  rating_average DECIMAL(2,1) DEFAULT 0,
  rating_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY one_review_per_user_per_product (product_id, user_id)
);

-- ===== Wishlist & Cart =====

CREATE TABLE wishlist_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Optional — see note above
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product (user_id, product_id)
);

-- ===== Orders & Payments =====

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_fee DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_full_name VARCHAR(150),
  shipping_phone VARCHAR(30),
  shipping_street VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_zip VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  method VARCHAR(30) NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  transaction_ref VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ===== Contact & Marketing =====

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== Store Locator =====

CREATE TABLE store_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  phone VARCHAR(30),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  opening_hours VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Latitude/longitude are included since a real store locator usually shows an embedded map — safe to leave them `NULL` for now if that's not being built yet.

---

## Why `orders` stores a shipping snapshot instead of just linking to `user_addresses`

This is deliberate, not an oversight: if a customer edits or deletes a saved address later, their _past_ order should still show exactly what was shipped where at the time — history shouldn't silently change because someone updated their profile. So at checkout, the chosen `user_addresses` row gets copied into the order's own `shipping_*` columns rather than just referenced by ID.

---

## Ownership, Matching the Backend Build Guide

- **Gerald:** `users`, `categories` (foundational, shared by everyone)
- **David:** `products`, `product_images`, `reviews`
- **Oreoluwa:** `user_addresses` (tied to AccountSettings)
- **Ibrahim:** `wishlist_items`, `cart_items` (if built), `orders`, `order_items`, `payments`
- **John:** `contact_messages`, `newsletter_subscribers`
- **Gerald (again):** `store_locations` — Kingsley's page has no backend owner assigned, so this defaults to Gerald unless you'd rather hand it to Kingsley directly now that there's an actual table for him to own.

Everything here drops straight into `database/schema.sql` from the build guide — same file, same one-time setup step, just now genuinely complete.
