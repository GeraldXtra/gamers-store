import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import "./ProductCard.css";
 
const ProductCard = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
 
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const hasMultipleImages = images.length > 1;
 
  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setImageIndex((prev) => (prev + 1) % images.length);
  };
 
  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
 
  const toggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted((prev) => !prev);
    // TODO: wire to wishlistService once AuthContext/CartContext exist
  };
 
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // TODO: wire to CartContext once it's built
    console.log("Add to cart:", product.name);
  };
 
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-zone">
        <span className="product-card-category">{product.category}</span>
 
        <div className="product-card-icons">
          <button
            className={`product-card-icon-btn ${
              isWishlisted ? "product-card-icon-active" : ""
            }`}
            onClick={toggleWishlist}
            aria-label="Add to wishlist"
          >
            <i className="bi bi-heart"></i>
          </button>
          <button className="product-card-icon-btn" aria-label="Compare">
            <i className="bi bi-arrow-left-right"></i>
          </button>
        </div>
 
        {product.badge && (
          <span
            className={`product-card-badge product-card-badge-${product.badge.toLowerCase()}`}
          >
            {product.badge}
          </span>
        )}
 
        <img
          key={imageIndex}
          src={images[imageIndex]}
          alt={product.name}
          className="product-card-image"
        />
 
        {hasMultipleImages && (
          <>
            <button
              className="product-card-nav product-card-nav-left"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="product-card-nav product-card-nav-right"
              onClick={nextImage}
              aria-label="Next image"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </>
        )}
      </div>
 
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <span className="product-card-price-original">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </p>
 
        <button className="product-card-add-to-cart" onClick={handleAddToCart}>
          ADD TO CART <i className="bi bi-cart"></i>
        </button>
      </div>
    </Link>
  );
};
 
export default ProductCard;
 


