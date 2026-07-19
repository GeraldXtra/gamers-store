import { useState, useEffect, useRef } from "react";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./TrendingProducts.css";

const allProducts = [
  {
    id: 1,
    filterKey: "external",
    category: "External SSDs",
    name: "RGB Double Shot PBT QUACK Mechanical Keyboard",
    price: 390,
    badge: null,
    images: [null],
  },
  {
    id: 2,
    filterKey: "external",
    category: "External SSDs",
    name: "Gaming Headphones Over-Ear FX-9909 Plus Blue/Black",
    price: 810,
    originalPrice: 890,
    badge: "SALE",
    images: [null],
  },
  {
    id: 3,
    filterKey: "internal",
    category: "Internal SSDs",
    name: "CPU Air Cooler FP120 Fan Anodized Gun-Metalic Black",
    price: 155,
    badge: null,
    images: [null],
  },
  {
    id: 4,
    filterKey: "internal",
    category: "Internal SSDs",
    name: "High-Airflow CXC-10269 Computer Case Black w/ Blue",
    price: 3850,
    badge: null,
    images: [null],
  },
  {
    id: 5,
    filterKey: "external",
    category: "External SSDs",
    name: '2TB SSD 3D TLC 6Gb/s 2.5" Internal Solid State Drive T253A300',
    price: 450,
    badge: null,
    images: [null],
  },
  {
    id: 6,
    filterKey: "internal",
    category: "Internal SSDs",
    name: 'MBB214 147GB 10000 RPM 16MB Cache SAS 6Gb/s 2.5" Hard Drive',
    price: 2330,
    badge: null,
    images: [null],
  },
];

const VISIBLE_CARDS = 5; // fallback only, used before layout has been measured
const LOADING_DELAY = 600; // ⚠ simulated delay — swap for a real productService call once the backend exists

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
  const [visibleCount, setVisibleCount] = useState(VISIBLE_CARDS);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const timeoutRef = useRef(null);
  const dragStateRef = useRef({ startX: 0, currentX: 0, active: false });

  const products =
    activeFilter === "all"
      ? allProducts
      : allProducts.filter((p) => p.filterKey === activeFilter);

  const maxIndex = Math.max(0, products.length - visibleCount);

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
      if (
        trackRef.current &&
        trackRef.current.children.length > 0 &&
        viewportRef.current
      ) {
        const firstCard = trackRef.current.children[0];
        const style = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(style.gap) || 0;
        const step = firstCard.offsetWidth + gap;
        setCardStep(step);

        const viewportWidth = viewportRef.current.offsetWidth;
        const count = Math.max(1, Math.round((viewportWidth + gap) / step));
        setVisibleCount(count);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products, isLoading]);

  // Keep the current slide in range whenever the number of visible
  // cards changes (rotating a device, resizing the browser, etc.)
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  // ── Drag / swipe support (mouse + touch, via Pointer Events) ──
  const handlePointerDown = (e) => {
    if (isLoading || cardStep === 0) return;
    dragStateRef.current = {
      startX: e.clientX,
      currentX: e.clientX,
      active: true,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.currentX = e.clientX;
    setDragOffset(dragStateRef.current.currentX - dragStateRef.current.startX);
  };

  const endDrag = () => {
    if (!dragStateRef.current.active) return;
    const delta = dragStateRef.current.currentX - dragStateRef.current.startX;
    dragStateRef.current.active = false;
    setIsDragging(false);
    setDragOffset(0);

    const threshold = Math.max(40, cardStep * 0.2);
    if (delta <= -threshold) {
      goNext();
    } else if (delta >= threshold) {
      goPrev();
    }
  };

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
          <div
            className="trending-products-viewport"
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onDragStart={(e) => e.preventDefault()}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              ref={trackRef}
              className="trending-products-track"
              style={{
                transform: `translateX(-${
                  currentIndex * cardStep - dragOffset
                }px)`,
                transition: isDragging ? "none" : undefined,
              }}
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
