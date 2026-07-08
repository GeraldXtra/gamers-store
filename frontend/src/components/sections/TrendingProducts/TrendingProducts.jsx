import { useState, useEffect, useRef } from "react";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./TrendingProducts.css";
import mechanicalKeyboard from "./../../../assets/mechanical-keyboard.png";
import mechanicalKeyboard1 from "./../../../assets/mechancal-keyboard-1.jpg";
import headset1 from "./../../../assets/headset-1.png";
import headset2 from "./../../../assets/headset2.png";
import cpu1 from "./../../../assets/cpu1.png";
import cpu2 from "./../../../assets/cpu2.png";
import case1 from "./../../../assets/case1.png";
import case2 from "./../../../assets/case2.png";
import SSD1 from "./../../../assets/SSD1.png";
import SSD2 from "./../../../assets/SSD2.png";

const allProducts = [
  {
    id: 1,
    filterKey: "external",
    category: "External SSDs",
    name: "RGB Double Shot PBT QUACK Mechanical Keyboard",
    price: 390,
    badge: null,
    images: [mechanicalKeyboard, mechanicalKeyboard1],
  },
  {
    id: 2,
    filterKey: "external",
    category: "External SSDs",
    name: "Gaming Headphones Over-Ear FX-9909 Plus Blue/Black",
    price: 810,
    originalPrice: 890,
    badge: "SALE",
    images: [headset1, headset2],
  },
  {
    id: 3,
    filterKey: "internal",
    category: "Internal SSDs",
    name: "CPU Air Cooler FP120 Fan Anodized Gun-Metalic Black",
    price: 155,
    badge: null,
    images: [cpu1, cpu2],
  },
  {
    id: 4,
    filterKey: "internal",
    category: "Internal SSDs",
    name: "High-Airflow CXC-10269 Computer Case Black w/ Blue",
    price: 3850,
    badge: null,
    images: [case1, case2],
  },
  {
    id: 5,
    filterKey: "external",
    category: "External SSDs",
    name: '2TB SSD 3D TLC 6Gb/s 2.5" Internal Solid State Drive T253A300',
    price: 450,
    badge: null,
    images: [SSD1, SSD2],
  },
  {
    id: 6,
    filterKey: "internal",
    category: "Internal SSDs",
    name: 'MBB214 147GB 10000 RPM 16MB Cache SAS 6Gb/s 2.5" Hard Drive',
    price: 2330,
    badge: null,
    images: [SSD1, SSD2],
  },
];

const VISIBLE_CARDS = 5;
const LOADING_DELAY = 600;

const filters = [
  { key: "all", label: "Show All" },
  { key: "external", label: "External SSDs" },
  { key: "internal", label: "Internal SSDs" },
];

const TrendingProducts = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const trackRef = useRef(null);
  const timeoutRef = useRef(null);

  const products =
    activeFilter === "all"
      ? allProducts
      : allProducts.filter((p) => p.filterKey === activeFilter);

  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);

  const handleFilterClick = (key) => {
    if (key === activeFilter) return;
    clearTimeout(timeoutRef.current);
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setActiveFilter(key);
      setCurrentIndex(0);
      setIsLoading(false);
    }, LOADING_DELAY);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const firstCard = trackRef.current.children[0];
        const style = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(style.gap) || 0;
        setCardStep(firstCard.offsetWidth + gap);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products, isLoading]);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="trending-products-main">
      <div className="trending-products">
        <div className="trending-products-header">
          <h2 className="trending-products-title">Trending Products</h2>

          <div className="trending-products-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`trending-filter-btn ${
                  activeFilter === f.key ? "trending-filter-active" : ""
                }`}
                onClick={() => handleFilterClick(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="trending-products-arrows">
            <button
              className="trending-arrow"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous products"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="trending-arrow"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next products"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="trending-spinner-wrap">
            <div className="trending-spinner">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.125}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="trending-products-viewport">
            <div
              ref={trackRef}
              className="trending-products-track"
              style={{ transform: `translateX(-${currentIndex * cardStep}px)` }}
            >
              {products.map((product) => (
                <div className="trending-products-slide" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
