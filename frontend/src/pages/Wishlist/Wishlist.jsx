import { useState } from "react";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import "./Wishlist.module.css";

// ⚠ PLACEHOLDER DATA — swap for a real wishlistService.getWishlist() call
// once AuthContext exists and there's an actual logged-in user to check.
const initialWishlist = [
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
    id: 6,
    category: "Monitors",
    name: '27" QHD Gaming Monitor 165Hz',
    price: 1450,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+2",
    ],
  },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);

  const handleRemove = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    // TODO: also call wishlistService.removeFromWishlist(productId) once it exists
  };

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="wishlist-empty">
          Your wishlist is empty. Go add something you like!
        </p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRemoveFromWishlist={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
