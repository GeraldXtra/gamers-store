import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS, CATEGORIES } from "../Shop/Shop";
import "./ProductDetail.css";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "/api";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="pd-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < fullStars ? "star filled" : "star"}>
          {i < fullStars ? "★" : "☆"}
        </span>
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
}

function RelatedCard({ product, onView }) {
  return (
    <div className="related-card" onClick={() => onView(product.id)}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="related-info">
        <h4>{product.name}</h4>
        <span className="related-price">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setAddedToCart(false);

    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error(`API responded with ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProduct(data);
          setError(null);
        }
      } catch (err) {
        // Fall back to mock catalog if API isn't ready
        const fallback = MOCK_PRODUCTS.find((p) => String(p.id) === String(id));
        if (!cancelled) {
          setProduct(fallback || null);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const relatedItems = MOCK_PRODUCTS.filter(
      (p) => p.category === product.category && String(p.id) !== String(product.id)
    ).slice(0, 4);
    setRelated(relatedItems);
  }, [product]);

  const handleAddToCart = () => {
    // TODO: wire up to real cart context/API when available
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleViewRelated = (relatedId) => navigate(`/product/${relatedId}`);

  if (loading) {
    return (
      <div className="pd-page">
        <div className="pd-loading">Loading product…</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-page">
        <div className="pd-not-found">
          <h2>Product not found</h2>
          <button className="btn-back" onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-page">
      {error && (
        <div className="api-warning">Live data unavailable — showing sample product.</div>
      )}

      <button className="btn-back" onClick={() => navigate("/shop")}>
        ← Back to Shop
      </button>

      <div className="pd-main">
        <div className="pd-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} />
          <p className="pd-reviews">{product.reviewCount ?? 0} reviews</p>

          <div className="pd-price">${product.price.toFixed(2)}</div>

          <div className={`pd-stock ${product.inStock ? "in" : "out"}`}>
            {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
          </div>

          <p className="pd-description">{product.description}</p>

          <div className="pd-specs">
            <h3>Specifications</h3>
            <ul>
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="spec-key">{key}</span>
                    <span className="spec-value">{value}</span>
                  </li>
                ))}
            </ul>
          </div>

          <button
            className="btn-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {!product.inStock ? "Out of Stock" : addedToCart ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="pd-related">
          <h2>Related Accessories</h2>
          <div className="related-grid">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} onView={handleViewRelated} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}