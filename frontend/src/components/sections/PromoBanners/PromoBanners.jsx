import PromoCard from "../../common/PromoCard/PromoCard";
import "./PromoBanners.css";

const promos = [
  {
    id: "promo-discount-2",
    title: "Limited Weekly Discount",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: null,
  },
  {
    id: "promo-drones",
    title: "Photo Drones",
    subtitle: 'MF841HN/A 13"',
    label: "Discount -30%",
    price: "$75",
    image: null,
  },
  {
    id: "promo-pc-parts",
    title: "PC Parts & Elements",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: null,
  },
];

const PromoBanners = () => {
  return (
    <section className="promo-banners-section">
      <div className="promo-banners-grid">
        {promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} compact />
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
