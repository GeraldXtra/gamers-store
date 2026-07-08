// components/sections/BrandLogos/BrandLogos.jsx
import "./BrandLogos.css";

const brands = [
  { id: 1, type: "icon", icon: "bi-triangle" },
  { id: 2, type: "text", main: "D", sub: "logodesign" },
  { id: 3, type: "text", main: "nulla" },
  { id: 4, type: "text", main: "M" },
  { id: 5, type: "text", main: "IOOFINTY" },
  { id: 6, type: "icon-text", icon: "bi-square", main: "SQUARE" },
];

const BrandLogos = () => {
  return (
    <section className="brand-logos-section">
      <div className="brand-logos-row">
        {brands.map((brand, i) => (
          <div
            key={brand.id}
            className={`brand-logo-item ${
              i !== brands.length - 1 ? "brand-logo-divider" : ""
            }`}
          >
            {brand.type === "icon" && (
              <i className={`bi ${brand.icon} brand-logo-icon`}></i>
            )}

            {brand.type === "text" && (
              <div className="brand-logo-text-wrap">
                <span className="brand-logo-main">{brand.main}</span>
                {brand.sub && (
                  <span className="brand-logo-sub">{brand.sub}</span>
                )}
              </div>
            )}

            {brand.type === "icon-text" && (
              <div className="brand-logo-text-wrap">
                <i className={`bi ${brand.icon} brand-logo-icon-small`}></i>
                <span className="brand-logo-sub">{brand.main}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandLogos;
