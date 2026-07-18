import "./PromoCard.css";

const PromoCard = ({ promo, compact }) => {
  const handleCardClick = () => {
    // TODO: navigate to promo detail page once it exists
    console.log("Navigate to promo:", promo.id);
  };

  const handleCtaClick = (e) => {
    e.stopPropagation();
    console.log("Navigate to:", promo.ctaLink || promo.id);
  };

  return (
    <div
      className={`promo-card ${compact ? "promo-card-compact" : ""}`}
      onClick={handleCardClick}
    >
      <div className="promo-card-content">
        <h3 className="promo-card-title">{promo.title}</h3>
        {promo.subtitle && (
          <p className="promo-card-subtitle">{promo.subtitle}</p>
        )}
        {promo.label && <span className="promo-card-label">{promo.label}</span>}
        {promo.price && <p className="promo-card-price">{promo.price}</p>}
        {promo.ctaText && (
          <button
            type="button"
            className="promo-card-cta"
            onClick={handleCtaClick}
          >
            {promo.ctaText}
            <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>

      <div className="promo-card-image-zone">
        {promo.image ? (
          <img
            src={promo.image}
            alt={promo.alt || promo.title}
            className="promo-card-image"
          />
        ) : (
          <div className="promo-card-image-placeholder">Image</div>
        )}
      </div>
    </div>
  );
};

export default PromoCard;
