import PromoCard from "../../common/PromoCard/PromoCard";
import "./PromoBanners.css";

const promos = [
  {
    id: "promo-joysticks",
    title: "Game Joysticks",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: "https://placehold.co/240x240/1a1a1a/666666?text=Joystick",
  },
  {
    id: "promo-monitors-keyboards",
    title: "Monitors & Keyboards",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: "https://placehold.co/240x240/1a1a1a/666666?text=Monitor",
  },
  {
    id: "promo-sport-watches",
    title: "Sport Watches",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: "https://placehold.co/240x240/1a1a1a/666666?text=Watch",
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
