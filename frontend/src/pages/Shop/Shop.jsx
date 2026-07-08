import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import "./Shop.css";

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const API_BASE_URL = import.meta.env?.VITE_API_URL || "/api";

export const CATEGORIES = [
  "Gaming Mice",
  "Mechanical Keyboards",
  "Gaming Headsets",
  "Controllers",
  "Gaming Monitors",
  "Gaming Chairs",
  "Gaming Desks",
  "Microphones",
  "Webcams",
  "VR Equipment",
  "PC Components",
  "Streaming Equipment",
  "Console Accessories",
  "RGB Accessories",
  "Mobile Gaming Accessories",
];

// Short prefix per category, used to build SKUs like "GM-MOU-001"
const CATEGORY_SKU_PREFIX = {
  "Gaming Mice": "MOU",
  "Mechanical Keyboards": "KEY",
  "Gaming Headsets": "HDS",
  "Controllers": "CTR",
  "Gaming Monitors": "MON",
  "Gaming Chairs": "CHR",
  "Gaming Desks": "DSK",
  "Microphones": "MIC",
  "Webcams": "CAM",
  "VR Equipment": "VRE",
  "PC Components": "PCC",
  "Streaming Equipment": "STR",
  "Console Accessories": "CON",
  "RGB Accessories": "RGB",
  "Mobile Gaming Accessories": "MOB",
};

const ADJECTIVES = [
  "Vortex", "Nova", "Apex", "Phantom", "Titan", "Nebula", "Blaze", "Cyclone",
  "Quantum", "Stealth", "Raptor", "Fusion", "Onyx", "Vertex", "Storm",
];
const SUFFIXES = ["Pro", "X", "Elite", "RGB", "Max", "Lite", "GX", "Prime", "II"];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const CATEGORY_ICONS = {
  "Gaming Mice": "M12 2a5 5 0 00-5 5v6a5 5 0 0010 0V7a5 5 0 00-5-5zM12 6v4",
  "Mechanical Keyboards": "M3 6h18v12H3z M6 10h.01 M10 10h.01 M14 10h.01 M18 10h.01 M6 14h12",
  "Gaming Headsets": "M4 13a8 8 0 0116 0v5a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3M4 13v3a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H4",
  "Controllers": "M6 12h4m-2-2v4M15 11h.01M18 13h.01M2 12a5 5 0 015-5h10a5 5 0 015 5v2a5 5 0 01-5 5c-1 0-2-2-3-2h-4c-1 0-2 2-3 2a5 5 0 01-5-5v-2z",
  "Gaming Monitors": "M3 4h18v13H3z M8 20h8 M12 17v3",
  "Gaming Chairs": "M6 3h12v9H6z M6 12l-2 9h4l1-4h6l1 4h4l-2-9",
  "Gaming Desks": "M3 8h18M5 8v11M19 8v11M3 19h18M9 12h6",
  "Microphones": "M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v4M9 21h6",
  "Webcams": "M12 8a4 4 0 100 8 4 4 0 000-8zM3 8l3-4h12l3 4M3 8v10h18V8",
  "VR Equipment": "M5 8h14a2 2 0 012 2v4a2 2 0 01-2 2h-3l-2 3-2-3H5a2 2 0 01-2-2v-4a2 2 0 012-2zM8 12h.01M16 12h.01",
  "PC Components": "M4 4h16v16H4z M9 4v16M15 4v16M4 9h16M4 15h16",
  "Streaming Equipment": "M23 7l-7 5 7 5V7z M1 5h15v14H1z",
  "Console Accessories": "M6 12h4m-2-2v4M15 11h.01M18 13h.01M2 12a5 5 0 015-5h10a5 5 0 015 5v2a5 5 0 01-5 5c-1 0-2-2-3-2h-4c-1 0-2 2-3 2a5 5 0 01-5-5v-2z",
  "RGB Accessories": "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M12 8a4 4 0 100 8 4 4 0 000-8z",
  "Mobile Gaming Accessories": "M7 2h10v20H7z M11 19h2",
};

function buildPlaceholderImage(category, seedIndex) {
  const iconPath = CATEGORY_ICONS[category] || CATEGORY_ICONS["PC Components"];
  const gradId = `g${seedIndex}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="400" viewBox="0 0 500 400">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f4f4f8"/>
          <stop offset="100%" stop-color="#e8e8f0"/>
        </linearGradient>
      </defs>
      <rect width="500" height="400" fill="url(#${gradId})"/>
      <g transform="translate(190,130)" stroke="#7c3aed" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="${iconPath}" transform="scale(5)"/>
      </g>
      <text x="250" y="330" text-anchor="middle" fill="#4b4b5a" font-family="Arial, sans-serif" font-size="20" font-weight="600">${category}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function generateMockProducts(count = 100) {
  const rand = seededRandom(42);
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];
    const adjective = ADJECTIVES[Math.floor(rand() * ADJECTIVES.length)];
    const suffix = SUFFIXES[Math.floor(rand() * SUFFIXES.length)];
    const basePrice = 15 + rand() * 285;
    const prefix = CATEGORY_SKU_PREFIX[category] || "GEN";
    const paddedId = String(i).padStart(3, "0");

    products.push({
      id: i,
      sku: `GM-${prefix}-${paddedId}`,
      name: `${adjective} ${category.replace(/s$/, "")} ${suffix}`,
      category,
      price: Number(basePrice.toFixed(2)),
      rating: Number((3.4 + rand() * 1.6).toFixed(1)),
      reviewCount: Math.floor(20 + rand() * 980),
      image: buildPlaceholderImage(category, i),
      description: `The ${adjective} ${suffix} delivers premium performance for competitive and casual gamers alike. Engineered with precision components and built to last through intense sessions.`,
      specifications: {
        Brand: `${adjective}Tech`,
        Connectivity: rand() > 0.5 ? "Wireless" : "Wired (USB-C)",
        Weight: `${(0.1 + rand() * 1.5).toFixed(2)} kg`,
        Warranty: "2 Years",
        Color: rand() > 0.5 ? "Black / RGB" : "White / RGB",
      },
      inStock: rand() > 0.15,
      stockCount: Math.floor(rand() * 200),
      isNew: rand() > 0.85,
    });
  }
  return products;
}

// Exported so ProductDetail.jsx can reuse the same mock catalog as a fallback
export const MOCK_PRODUCTS = generateMockProducts(100);

// ---------------------------------------------------------------------------
// STAR RATING
// ---------------------------------------------------------------------------
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="shop-rating" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        let symbol = "☆";
        if (i < fullStars) symbol = "★";
        else if (i === fullStars && hasHalf) symbol = "★";
        return (
          <span
            key={i}
            className={i < fullStars || (i === fullStars && hasHalf) ? "star filled" : "star"}
          >
            {symbol}
          </span>
        );
      })}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PRODUCT CARD
// ---------------------------------------------------------------------------
function ProductCard({ product, onView, isWishlisted, onToggleWishlist, isCompared, onToggleCompare, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <div className="product-card">
      <div className="card-top">
        <span className="card-category-label">{product.category}</span>
        <div className="card-icons">
          <button
            className={isWishlisted ? "icon-btn active" : "icon-btn"}
            onClick={() => onToggleWishlist(product.id)}
            aria-label="Add to wishlist"
            title="Add to wishlist"
          >
            {isWishlisted ? "♥" : "♡"}
          </button>
          <button
            className={isCompared ? "icon-btn active" : "icon-btn"}
            onClick={() => onToggleCompare(product.id)}
            aria-label="Add to compare"
            title="Add to compare"
          >
            ⇄
          </button>
        </div>
      </div>

      <div className="card-image-wrap" onClick={() => onView(product.id)}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.isNew && <span className="badge-new">NEW</span>}
        {!product.inStock && <span className="badge-out">Out of Stock</span>}

        <div className="card-hover-overlay">
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      <div className="card-body">
        <span className="card-sku">{product.sku}</span>
        <h3 className="card-title">{product.name}</h3>
        <StarRating rating={product.rating} />
        <span className="card-price">{formatPrice(product.price)}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SIDEBAR
// ---------------------------------------------------------------------------
function Sidebar({ categoryCounts, selectedCategories, onToggleCategory, onClearCategories }) {
  return (
    <aside className="shop-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3>Category</h3>
          {selectedCategories.size > 0 && (
            <button className="clear-btn" onClick={onClearCategories}>
              Clear
            </button>
          )}
        </div>
        <ul className="category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <label className="category-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(cat)}
                  onChange={() => onToggleCategory(cat)}
                />
                <span className="checkbox-visual" />
                <span className="category-name">{cat}</span>
                <span className="category-count">({categoryCounts[cat] || 0})</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// MAIN SHOP COMPONENT
// ---------------------------------------------------------------------------
export default function Shop() {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState(new Set());
  const [compareList, setCompareList] = useState(new Set());

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error(`API responded with ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProducts(Array.isArray(data) && data.length ? data : MOCK_PRODUCTS);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setProducts(MOCK_PRODUCTS);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list =
      selectedCategories.size === 0
        ? products
        : products.filter((p) => selectedCategories.has(p.category));

    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, selectedCategories, sortBy]);

  const handleView = (id) => navigate(`/product/${id}`);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const clearCategories = () => setSelectedCategories(new Set());

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddToCart = (id) => {
    // TODO: wire up to real cart context/API when available
    console.log("Added to cart:", id);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>
          Gaming <span className="accent">Accessories</span>
        </h1>
        <p>
          Showing {filteredProducts.length} of {products.length} results
        </p>
      </div>

      {error && (
        <div className="api-warning">Live data unavailable — showing sample catalog.</div>
      )}

      <div className="shop-layout">
        <Sidebar
          categoryCounts={categoryCounts}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          onClearCategories={clearCategories}
        />

        <main className="shop-main">
          <div className="shop-toolbar">
            <span className="results-count">{filteredProducts.length} products</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-grid">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={handleView}
                  isWishlisted={wishlist.has(product.id)}
                  onToggleWishlist={toggleWishlist}
                  isCompared={compareList.has(product.id)}
                  onToggleCompare={toggleCompare}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}