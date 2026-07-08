import samuraiPS5 from "./../../../assets/ps5.png";
import "./GamingConsoleBanner.css";

const GamingConsoleBanner = () => {
  return (
    <section className="gaming-console-banner">
      <div className="gaming-console-content">
        <div className="gaming-console-text">
          <h2 className="gaming-console-title">Latest Gaming Console</h2>
          <p className="gaming-console-subtitle">ASUS CX70 2QF-621XPL 13"</p>
          <a href="/shop" className="gaming-console-cta">
            Shop Now <i className="bi bi-chevron-right"></i>
          </a>
        </div>

        <div className="gaming-console-image-zone">
          <img
            src={samuraiPS5}
            alt="Latest Gaming Console"
            className="gaming-console-image"
          />
        </div>
      </div>
    </section>
  );
};

export default GamingConsoleBanner;
