import { useState } from "react";
import styles from "./Wishlist.module.css";

const sampleWishlist = [
  {
    id: 1,
    name: "Wireless Gaming Mouse XF-550",
    category: "Accessories",
    price: 45.99,
    inStock: true,
  },
  {
    id: 2,
    name: "RGB Mechanical Keyboard Pro",
    category: "Accessories",
    price: 89.99,
    inStock: true,
  },
  {
    id: 3,
    name: "Over-Ear Gaming Headset FX-990",
    category: "Audio",
    price: 65.0,
    inStock: false,
  },
];

function Wishlist() {
  const [items, setItems] = useState(sampleWishlist);

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <p className={styles.breadcrumb}>Home / Wishlist</p>
      <h1 className={styles.title}>My Wishlist</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>No items added to the wishlist</p>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imagePlaceholder}></div>
                  <button
                    className={styles.removeIcon}
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove from wishlist"
                    title="Remove"
                  >
                    ×
                  </button>
                  {!item.inStock && (
                    <span className={styles.soldBadge}>Sold Out</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <p className={styles.category}>{item.category}</p>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.price}>${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Hidden below the card until hover — then slides up to fill the space that opens below */}
              <div className={styles.addToCartWrapper}>
                <button className={styles.addToCart} disabled={!item.inStock}>
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;