import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./FloatingActions.css";

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={styles.floatingActions}>
      {showScrollTop && (
        <button
          className={styles.scrollTopBtn}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i class="bi bi-chevron-up"></i>
        </button>
      )}
      <Link
        to="/store-locator"
        className={styles.locatorBtn}
        aria-label="Store Locator"
      >
        <i class="bi bi-geo-alt-fill"></i>
      </Link>
      <Link to="/checkout" className={styles.cartBtn} aria-label="View Cart">
        <i class="bi bi-cart"></i>
      </Link>
    </div>
  );
};

export default FloatingActions;
