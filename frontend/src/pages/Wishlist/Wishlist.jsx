import { useState } from "react";
import styles from "./Wishlist.module.css";

// Temporary sample data — replace with real data from wishlistService later
const sampleWishlist = [
  { id: 1, name: "Wireless Gaming Mouse", price: 45.99, inStock: true, image: "" },
  { id: 2, name: "Mechanical Keyboard", price: 89.99, inStock: true, image: "" },
  { id: 3, name: "Gaming Headset", price: 65.0, inStock: false, image: "" },
];

function Wishlist() {
  const [items, setItems] = useState(sampleWishlist);

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <p className={styles.breadcrumb}>Home / Wishlist</p>
      <h1 className={styles.title}>Wishlist</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>No items added to the wishlist</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.imagePlaceholder}></div>
                  </td>
                  <td className={styles.name}>{item.name}</td>
                  <td className={styles.price}>${item.price.toFixed(2)}</td>
                  <td>
                    <span
                      className={item.inStock ? styles.inStock : styles.outOfStock}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <button className={styles.addToCart} disabled={!item.inStock}>
                      Add to Cart
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.remove}
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Wishlist;