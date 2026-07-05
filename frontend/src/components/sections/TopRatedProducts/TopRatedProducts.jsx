// components/sections/TopRatedProducts/TopRatedProducts.jsx
import ProductCard from "../../common/ProductCard/ProductCard";
import PromoCard from "../../common/PromoCard";
import "./TopRatedProducts.css";
import mouseImg from "./../../../assets/mouse-top-rated.png";
import mouseImg2 from "./../../../assets/mouse-1-top-rated.png";

const promos = [
  {
    id: "promo-1",
    title: "EZ-77 PC Worldwide",
    subtitle: 'MF841HN/A 13"',
    label: "Starting at",
    price: "$1,750",
    image: null, // TODO: add real image
  },
  {
    id: "promo-2",
    title: "Limited Weekly Discount",
    subtitle: null,
    label: "Discount -30%",
    price: "$349",
    image: null, // TODO: add real image
  },
];

const products = [
  {
    id: 1,
    category: "Premium Laptops",
    name: "Wireless PC Mouse XF-550 in Carbon Black/Grey/Green",
    price: 290,
    badge: null,
    images: [mouseImg, mouseImg2],
  },
  {
    id: 2,
    category: "Premium Laptops",
    name: "Fractal Design 850-PW Tempered Glass Computer Case",
    price: 2790,
    badge: "NEW",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Case+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Case+2",
    ],
  },
  {
    id: 3,
    category: "Premium Laptops",
    name: 'MBD214 147GB 10000 RPM 16MB Cache SAS 6Gb/s 2.5" Hard Drive',
    price: 2330,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=HDD+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=HDD+2",
    ],
  },
  {
    id: 4,
    category: "Premium Laptops",
    name: "FTW-3553 8GB 2666MHz DDR4 DIMM Desktop Memory",
    price: 1280,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+2",
    ],
  },
  {
    id: 5,
    category: "Premium Laptops",
    name: "High Definition Monitor Red/Black Expo SDS-855697",
    price: 1490,
    badge: "SOLD",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+2",
    ],
  },
];

const TopRatedProducts = () => {
  return (
    <section className="top-rated-products">
      <h2 className="top-rated-products-title">Top Rated Products</h2>
      <div className="top-rated-products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="top-rated-products-promos">
        {promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedProducts;
