IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'gamers_store')
BEGIN
  CREATE DATABASE gamers_store;
END
GO

USE gamers_store;
GO

-- Users & Accounts

CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE user_addresses (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  label VARCHAR(50),
  full_name VARCHAR(150),
  phone VARCHAR(30),
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Nigeria',
  is_default BIT DEFAULT 0,
  created_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Catalog

CREATE TABLE categories (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  icon VARCHAR(50),
  created_at DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE products (
  id INT IDENTITY(1,1) PRIMARY KEY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  badge VARCHAR(20),
  description VARCHAR(MAX),
  stock_qty INT DEFAULT 0,
  rating_average DECIMAL(2,1) DEFAULT 0,
  rating_count INT DEFAULT 0,
  created_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
  id INT IDENTITY(1,1) PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id INT IDENTITY(1,1) PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment VARCHAR(MAX),
  created_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT one_review_per_user_per_product UNIQUE (product_id, user_id)
);

-- Wishlist & Cart

CREATE TABLE wishlist_items (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Optional — see note above
CREATE TABLE cart_items (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  added_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);

-- Orders & Payments

CREATE TABLE orders (
  id INT IDENTITY(1,1) PRIMARY KEY,
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
  created_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT IDENTITY(1,1) PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE payments (
  id INT IDENTITY(1,1) PRIMARY KEY,
  order_id INT NOT NULL,
  method VARCHAR(30) NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  transaction_ref VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  paid_at DATETIME2 NULL,
  created_at DATETIME2 DEFAULT SYSDATETIME(),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Contact & Marketing

CREATE TABLE contact_messages (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message VARCHAR(MAX) NOT NULL,
  created_at DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE newsletter_subscribers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  subscribed_at DATETIME2 DEFAULT SYSDATETIME()
);

-- Store Locator

CREATE TABLE store_locations (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  phone VARCHAR(30),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  opening_hours VARCHAR(255),
  created_at DATETIME2 DEFAULT SYSDATETIME()
);