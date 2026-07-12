// import samuraiPS5 from "./../../../assets/ps5.png";
// import "./GamingConsoleBanner.css";

// const GamingConsoleBanner = () => {
//   return (
//     <section className="gaming-console-banner">
//       <div className="gaming-console-content">
//         <div className="gaming-console-text">
//           <h2 className="gaming-console-title">Latest Gaming Console</h2>
//           <p className="gaming-console-subtitle">ASUS CX70 2QF-621XPL 13"</p>
//           <a href="/shop" className="gaming-console-cta">
//             Shop Now <i className="bi bi-chevron-right"></i>
//           </a>
//         </div>

//         <div className="gaming-console-image-zone">
//           <img
//             src={samuraiPS5}
//             alt="Latest Gaming Console"
//             className="gaming-console-image"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GamingConsoleBanner;

import { useState, useEffect } from "react";
import samuraiPS5 from "./../../../assets/ps5.png";
import "./GamingConsoleBanner.css";

const slides = [
  {
    title: "Latest Gaming Console",
    subtitle: 'ASUS CX70 2QF-621XPL 13"',
    price: "$950",
    image: samuraiPS5,
    animation: "from-above",
  },
  {
    title: "Next-Gen Performance",
    subtitle: 'ASUS CX70 2QF-621XPL 13"',
    price: "$1,200",
    image: samuraiPS5,
    animation: "from-below",
  },
  {
    title: "Ultimate Gaming Setup",
    subtitle: 'ASUS CX70 2QF-621XPL 13"',
    price: "$1,500",
    image: samuraiPS5,
    animation: "from-side",
  },
];

const GamingConsoleBanner = () => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  /* Auto-advance every 5 s — functional updates avoid stale closure */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const advance = (dir) => {
    setCurrent((prev) => (prev + dir + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  };

  const goTo = (index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  };

  const slide = slides[current];

  return (
    <section className="gaming-console-banner">
      {/* ── Left Chevron ── */}
      <button
        className="carousel-nav prev"
        onClick={() => advance(-1)}
        aria-label="Previous slide"
      >
        <i className="bi bi-chevron-left" />
      </button>

      {/* ── Slide Content — key forces animation replay on every change ── */}
      <div
        key={animKey}
        className={`gaming-console-content anim-${slide.animation}`}
      >
        <div className="gaming-console-text">
          <h2 className="gaming-console-title">{slide.title}</h2>
          <p className="gaming-console-subtitle">{slide.subtitle}</p>
          <div className="gaming-console-price-block">
            <span className="price-label">STARTING AT</span>
            <span className="price-value">{slide.price}</span>
          </div>
        </div>

        <div className="gaming-console-image-zone">
          <img
            src={slide.image}
            alt={slide.title}
            className="gaming-console-image"
          />
        </div>
      </div>

      {/* ── Right Chevron ── */}
      <button
        className="carousel-nav next"
        onClick={() => advance(1)}
        aria-label="Next slide"
      >
        <i className="bi bi-chevron-right" />
      </button>

      {/* ── Tracker Dots ── */}
      <div className="carousel-tracker">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`tracker-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default GamingConsoleBanner;
