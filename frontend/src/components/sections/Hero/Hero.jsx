import { useState, useEffect, useRef } from "react";
import PS5Img from "./../../../assets/Sony_PS5_DualSense_Edge_Wireless_Controller.png";
import cpuImg from "./../../../assets/cpu.png";
import gtximg from "./../../../assets/Gigabyte_GeForce_GTX_1080_Ti_11GB_AORUS_XTREME_Waterforce_WB.png";
import mouseImg from "./../../../assets/mouse.png";
import keyboardImg from "./../../../assets/keyboard.png";
import Button from "./../../common/Button/Button";
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
  { id: 5, title: "Carbon Black Optical Mouse", subtitle: "Gaming mouse", ctaText: "Shop Now", ctaLink: "/shop", image: mouseImg },
];

const SLIDE_INTERVAL = 3000;

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);

  const totalSlides = slides.length;

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

  const slide = slides[activeSlide];

  return (
    <section className="hero" id="hero-section">
      <div className="hero-content">
        <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous slide">
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="hero-text-col">
          <div key={activeSlide} className="hero-text">
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <Button variant="primary" size="md" to={slide.ctaLink} icon="bi-chevron-right" hoverIcon="bi-plus-lg">
              {slide.ctaText}
            </Button>
          </div>

          <div className="hero-dots">
            {slides.map((s, index) => (
              <button
                key={s.id}
                className={`hero-dot ${index === activeSlide ? "hero-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div key={`img-${activeSlide}`} className="hero-image-wrap">
          <img src={slide.image} alt={slide.title} className="hero-image" />
        </div>

        <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next slide">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;
