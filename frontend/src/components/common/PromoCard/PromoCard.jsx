import "./PromoCard.css";

const PromoCard = ({ promo }) => {
  const handleClick = () => {
    // TODO: navigate to promo detail page once it exists
    console.log("Navigate to promo:", promo.id);
  };

  return (
    <div
      className="promo-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="promo-card-content">
        <h3 className="promo-card-title">{promo.title}</h3>
        {promo.subtitle && (
          <p className="promo-card-subtitle">{promo.subtitle}</p>
        )}
        <span className="promo-card-label">{promo.label}</span>
        <p className="promo-card-price">{promo.price}</p>
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
