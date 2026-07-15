import { useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import "./ProductCard.css";

const ProductCard = ({ product, onRemoveFromWishlist, variant }) => {
  const isCompact = variant === "compact";
  const [imageIndex, setImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product.id);
    } else {
      setIsWishlisted((prev) => !prev);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Add to cart:", product.name);
  };

  const heartActive = onRemoveFromWishlist ? true : isWishlisted;

  if (isCompact) {
    return (
      <div className="product-card product-card-compact-variant">
        <div className="product-card-compact-icons">
          <button
            className={`product-card-icon-btn ${
              heartActive ? "product-card-icon-active" : ""
            }`}
            onClick={toggleWishlist}
            aria-label={
              onRemoveFromWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <i className="bi bi-heart"></i>
          </button>
          <button className="product-card-icon-btn" aria-label="Compare">
            <i className="bi bi-arrow-left-right"></i>
          </button>
        </div>

        <div className="product-card-compact-image-zone">
          <img
            src={images[imageIndex]}
            alt={product.name}
            className="product-card-compact-image"
          />
        </div>

        <div className="product-card-compact-content">
          <span className="product-card-compact-category">
            {product.category}
          </span>

          {product.badge && (
            <span
              className={`product-card-badge product-card-compact-badge product-card-badge-${product.badge.toLowerCase()}`}
            >
              {product.badge}
            </span>
          )}

          <h3 className="product-card-compact-name">{product.name}</h3>
          <p className="product-card-compact-price">
            {formatPrice(product.price)}
            {product.originalPrice && (
              <span className="product-card-price-original">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </p>
        </div>

        <button
          className="product-card-cart-compact"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <i className="bi bi-cart-plus"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="product-card">
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
    </div>
  );
};

export default ProductCard;
