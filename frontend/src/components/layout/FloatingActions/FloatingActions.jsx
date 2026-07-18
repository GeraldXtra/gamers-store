import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./FloatingActions.css";

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowScrollTop(false);
    const heroEl = document.getElementById("hero-section");

    if (heroEl) {
      const observer = new IntersectionObserver(
        ([entry]) => setShowScrollTop(!entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(heroEl);
      return () => observer.disconnect();
    } else {
      const handleScroll = () => setShowScrollTop(window.scrollY > 300);
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="floating-actions">
      {showScrollTop && (
        <button
          className="floating-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="bi bi-chevron-up"></i>
        </button>
      )}

      <Link to="/checkout" className="floating-cart-btn" aria-label="Buy now">
        <span className="floating-cart-icon">
          <i className="bi bi-cart-fill"></i>
        </span>
        <span className="floating-cart-label">BUY NOW</span>
      </Link>
    </div>
  );
};

export default FloatingActions;
