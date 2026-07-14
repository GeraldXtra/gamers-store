# gamers-store — Complete Backend Project Structure

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                    Gerald
│   ├── routes/
│   │   ├── index.js                 Gerald
│   │   ├── auth.routes.js           Oreoluwa
│   │   ├── product.routes.js        David   (includes /deals — powers WeeklyDiscountDropdown)
│   │   ├── wishlist.routes.js       Ibrahim
│   │   ├── order.routes.js          Ibrahim
│   │   └── contact.routes.js        John
│   ├── controllers/
│   │   ├── auth.controller.js       Oreoluwa
│   │   ├── product.controller.js    David
│   │   ├── wishlist.controller.js   Ibrahim
│   │   ├── order.controller.js      Ibrahim
│   │   └── contact.controller.js    John
│   ├── services/
│   │   ├── auth.service.js          Oreoluwa
│   │   ├── product.service.js       David
│   │   ├── wishlist.service.js      Ibrahim
│   │   ├── order.service.js         Ibrahim
│   │   └── contact.service.js       John
│   ├── models/
│   │   ├── user.model.js            Oreoluwa
│   │   ├── product.model.js         David
│   │   ├── wishlist.model.js        Ibrahim
│   │   ├── order.model.js           Ibrahim
│   │   └── contact.model.js         John
│   ├── middleware/
│   │   ├── auth.middleware.js       Gerald
│   │   └── errorHandler.js          Gerald
│   ├── utils/
│   │   └── generateToken.js         Gerald
│   ├── database/
│   │   └── schema.sql               Gerald
│   └── app.js                       Gerald
├── server.js                        Gerald
├── .env                             Gerald (never pushed)
├── .env.example                     Gerald (pushed)
├── .gitignore
└── package.json
```

**Kingsley — no backend folder.** FAQ, Terms & Conditions, Store Locator, Pricing Plans are all fully static, confirmed by your actual frontend tree.

**Frontend pages still empty (Login, SignUp, AccountSettings, Checkout, ProductDetail, GetInTouch) map to backend as already planned:**
| Empty page | Owner | Backend it needs |
|---|---|---|
| Login, SignUp, AccountSettings | Oreoluwa | `auth.*` files |
| Checkout | Ibrahim | `order.*` files |
| ProductDetail | David | `product.*` files (already built for Shop) |
| GetInTouch | John | `contact.*` files (already built for ContactUs) |

---

## SQL Database — `database/schema.sql`

```sql
CREATE DATABASE IF NOT EXISTS gamers_store;
USE gamers_store;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  badge VARCHAR(20),
  description TEXT,
  stock_qty INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE wishlist_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  shipping_address TEXT,
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

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

No separate "cart" or "deals" table needed — cart stays in `CartContext` until checkout, and "weekly discount" products are just existing rows in `products` where `badge = 'SALE'`, queried differently, not stored differently.
