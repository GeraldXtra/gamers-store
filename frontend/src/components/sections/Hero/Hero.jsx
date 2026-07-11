import { useState, useEffect, useRef } from "react";
import PS5Img from "./../../../assets/Sony_PS5_DualSense_Edge_Wireless_Controller.png";
import cpuImg from "./../../../assets/cpu.png";
import gtximg from "./../../../assets/Gigabyte_GeForce_GTX_1080_Ti_11GB_AORUS_XTREME_Waterforce_WB.png";
import mouseImg from "./../../../assets/mouse.png";
import keyboardImg from "./../../../assets/keyboard.png";
import "./Hero.css";

const slides = [
  {
    id: 1,
    title: "New Controller",
    subtitle: "Sony PS5 DualSense Edge Wireless Controller",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: PS5Img,
  },
  {
    id: 2,
    title: "Latest GTX-Ti Graphic Card",
    subtitle: "Gigabyte GeForce GTX 1080 Ti 11GB AORUS XTREME Waterforce WB",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: gtximg,
  },
  {
    id: 3,
    title: "The Best Processor",
    subtitle: "Skytech King 95 Gaming PC Desktop AMD Ryzen 7 9800X3D NVIDIA GeForce RTX 5070 1TB Gen4 NVMe SSD 32GB DDR5 RAM, AIO Liquid Cooling Windows 11",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: cpuImg,
  },
  { id: 4, title: "Mechanical Keyboard", subtitle: "Gaming Keyboard", ctaText: "Shop Now", ctaLink: "/shop", image: keyboardImg },
  { id: 5, title: "Carbon Black Optical Mouse", subtitle: "Gaming mouse", ctaText: "SHop Now", ctaLink: "/shop", image: mouseImg },
];

const categories = [
  { id: 1, label: "Gaming Computer", icon: "bi-laptop" },
  { id: 2, label: "Headphones", icon: "bi-headphones" },
  { id: 3, label: "Graphic Cards", icon: "bi-nvidia" },
  { id: 4, label: "Playstations", icon: "bi-controller" },
  { id: 5, label: "XBox", icon: "bi-xbox" },
  { id: 6, label: "Gaming Keyboard", icon: "bi-keyboard" },
  { id: 7, label: "Gaming Mouse", icon: "bi-mouse" },
  { id: 8, label: "Mouse Pad", icon: "bi-square" },
];

const VISIBLE_CATEGORIES = 6;
const SLIDE_INTERVAL = 3000; // unchanged — you only asked to change the animation feel, not the timing

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const timerRef = useRef(null);

  const totalSlides = slides.length;
  const maxCategoryOffset = categories.length - VISIBLE_CATEGORIES;

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide(index);
    startTimer();
  };

  const nextSlide = () => goToSlide((activeSlide + 1) % totalSlides);
  const prevSlide = () => goToSlide((activeSlide - 1 + totalSlides) % totalSlides);

  const scrollCategories = (direction) => {
    setCategoryOffset((prev) => Math.min(Math.max(prev + direction, 0), maxCategoryOffset));
  };

  const visibleCategories = categories.slice(categoryOffset, categoryOffset + VISIBLE_CATEGORIES);
  const thumbWidthPercent = (VISIBLE_CATEGORIES / categories.length) * 100;
  const thumbLeftPercent = maxCategoryOffset === 0 ? 0 : (categoryOffset / maxCategoryOffset) * (100 - thumbWidthPercent);

  const slide = slides[activeSlide];

  return (
    <section className="hero" id="hero-section">
      <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous slide">
        <i className="bi bi-chevron-left"></i>
      </button>

      <div className="hero-content">
        <div key={activeSlide} className="hero-text">
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-subtitle">{slide.subtitle}</p>
          <a href={slide.ctaLink} className="hero-cta">
            {slide.ctaText} <i className="bi bi-chevron-right"></i>
          </a>
        </div>

        <div key={`img-${activeSlide}`} className="hero-image-wrap">
          <img src={slide.image} alt={slide.title} className="hero-image" />
        </div>
      </div>

      <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next slide">
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Progress line removed per your request — was here before, now gone */}

      <div className="hero-category-bar">
        <button className="hero-category-arrow hero-category-arrow-left" onClick={() => scrollCategories(-1)} disabled={categoryOffset === 0} aria-label="Scroll categories left">
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="hero-category-inner">
          <div className="hero-category-track">
            <div className="hero-category-thumb" style={{ width: `${thumbWidthPercent}%`, left: `${thumbLeftPercent}%` }} />
          </div>

          <div className="hero-category-list">
            {visibleCategories.map((cat, i) => {
              const realIndex = categoryOffset + i;
              return (
                <button key={cat.id} className={`hero-category-item ${activeCategory === realIndex ? "hero-category-active" : ""}`} onClick={() => setActiveCategory(realIndex)}>
                  <i className={`bi ${cat.icon}`}></i>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          className="hero-category-arrow hero-category-arrow-right"
          onClick={() => scrollCategories(1)}
          disabled={categoryOffset === maxCategoryOffset}
          aria-label="Scroll categories right"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;
