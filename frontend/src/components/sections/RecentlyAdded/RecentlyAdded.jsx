import { useState, useEffect, useRef } from "react";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./RecentlyAdded.css";

const products = [
  {
    id: 1,
    category: "Fitbit",
    name: "Wireless PC Mouse XF-550 in Carbon Black",
    price: 290,
    badge: "SOLD",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+2",
    ],
  },
  {
    id: 2,
    category: "Fitbit",
    name: "CPU Air Cooler FP130 Fan Anodized Metal",
    price: 155,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Cooler+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Cooler+2",
    ],
  },
  {
    id: 3,
    category: "Fitbit",
    name: "BW-23571 Closed-Back Headphones Pro",
    price: 700,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Headphones+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Headphones+2",
    ],
  },
  {
    id: 4,
    category: "Fitbit",
    name: "Tablet W-56774 Mini Series with Keyboard",
    price: 890,
    badge: "NEW",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Tablet+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Tablet+2",
    ],
  },
  {
    id: 5,
    category: "Fitbit",
    name: "High Definition Web Camera SPX-8962",
    price: 140,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Camera+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Camera+2",
    ],
  },
  {
    id: 6,
    category: "Fitbit",
    name: "FTW-37 256GB DDR4 Desktop Memory",
    price: 1180,
    originalPrice: 1280,
    badge: "SALE",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+2",
    ],
  },
  {
    id: 7,
    category: "Fitbit",
    name: "2TB USB 3.1 External Hard Drive Orange",
    price: 210,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=HDD+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=HDD+2",
    ],
  },
  {
    id: 8,
    category: "Fitbit",
    name: "RGB PTP-50 Mechanical Keyboard",
    price: 390,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Keyboard+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Keyboard+2",
    ],
  },
];

// Tablet & mobile get the auto-advancing single-card carousel.
// Laptop, desktop, and big screens keep the plain static grid.
const CAROUSEL_QUERY = "(max-width: 1024px)";
const AUTO_ADVANCE_MS = 2000;

const RecentlyAdded = () => {
  const [isCarousel, setIsCarousel] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(CAROUSEL_QUERY).matches
      : false,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);

  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  // Watch for crossing the tablet/laptop boundary (resize, rotation, etc.)
  useEffect(() => {
    const mql = window.matchMedia(CAROUSEL_QUERY);
    const update = () => setIsCarousel(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Reset to the first slide whenever switching in/out of carousel mode
  useEffect(() => {
    setCurrentIndex(0);
  }, [isCarousel]);

  // Measure one slide's width (+gap) so translateX moves exactly one card
  useEffect(() => {
    if (!isCarousel) return;
    const measure = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const firstSlide = trackRef.current.children[0];
        const style = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(style.gap) || 0;
        setCardStep(firstSlide.offsetWidth + gap);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isCarousel]);

  const startAutoAdvance = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, AUTO_ADVANCE_MS);
  };

  // Auto-advance runs only in carousel mode (tablet/mobile)
  useEffect(() => {
    if (!isCarousel) return;
    startAutoAdvance();
    return () => clearInterval(intervalRef.current);
  }, [isCarousel]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    if (isCarousel) startAutoAdvance();
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    if (isCarousel) startAutoAdvance();
  };

  return (
    <section className="recently-added">
      <h2 className="recently-added-title">Recently Added</h2>

      <div className="recently-added-viewport">
        {isCarousel && (
          <button
            className="recently-added-arrow recently-added-arrow-prev"
            onClick={goPrev}
            aria-label="Previous product"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        )}

        <div
          ref={trackRef}
          className="recently-added-grid"
          style={
            isCarousel
              ? { transform: `translateX(-${currentIndex * cardStep}px)` }
              : undefined
          }
        >
          {products.map((product) => (
            <div className="recently-added-slide" key={product.id}>
              <ProductCard product={product} variant="compact" />
            </div>
          ))}
        </div>

        {isCarousel && (
          <button
            className="recently-added-arrow recently-added-arrow-next"
            onClick={goNext}
            aria-label="Next product"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;
