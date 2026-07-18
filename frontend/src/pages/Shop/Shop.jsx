import { useState } from "react";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import "./Shop.css";

// ⚠ PLACEHOLDER DATA — swap for a real productService.getAllProducts() call
// once the backend exists. Keep the same object shape.
const allProducts = [
  {
    id: 1,
    category: "Gaming Mouse",
    name: "Wireless Gaming Mouse Pro X",
    price: 450,
    badge: "NEW",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+2",
    ],
  },
  {
    id: 2,
    category: "Gaming Keyboard",
    name: "Mechanical RGB Keyboard K-900",
    price: 890,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Keyboard+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Keyboard+2",
    ],
  },
  {
    id: 3,
    category: "Graphic Cards",
    name: "RTX 4070 Super Graphics Card",
    price: 3200,
    badge: "SALE",
    originalPrice: 3600,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=GPU+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=GPU+2",
    ],
  },
  {
    id: 4,
    category: "Headphones",
    name: "Studio Gaming Headset Z-Series",
    price: 650,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Headset+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Headset+2",
    ],
  },
  {
    id: 5,
    category: "Gaming Mouse",
    name: "Ergo Wireless Mouse Lite",
    price: 210,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+3",
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+4",
    ],
  },
  {
    id: 6,
    category: "Monitors",
    name: '27" QHD Gaming Monitor 165Hz',
    price: 1450,
    badge: "NEW",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+2",
    ],
  },
];

const categories = [
  "All",
  "Gaming Mouse",
  "Gaming Keyboard",
  "Graphic Cards",
  "Headphones",
  "Monitors",
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="shop-page">
      <h1 className="shop-title">Shop</h1>

      <div className="shop-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`shop-filter-btn ${
              activeCategory === cat ? "shop-filter-active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
