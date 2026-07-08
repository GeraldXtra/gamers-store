// components/sections/TopRatedProducts/TopRatedProducts.jsx
import ProductCard from "../../common/ProductCard/ProductCard";
import PromoCard from "../../common/PromoCard/PromoCard";
import "./TopRatedProducts.css";
import mouseImg from "./../../../assets/mouse-top-rated.png";
import mouseImg2 from "./../../../assets/mouse-1-top-rated.png";
import HDD from "./../../../assets/HDD.png";
import HDD1 from "./../../../assets/HDD-1.png";
import vrPromo from "./../../../assets/vr-promo.png";
import headsetPromo from "./../../../assets/headset-promo.png";
import gamingGlassCPU from "./../../../assets/gaming-glass-cpu.png";
import gamingGlassCPU1 from "./../../../assets/gmaing-glass-cpu-1.png";
import desktopMem from "./../../../assets/desktop-mem.png";
import desktopMem1 from "./../../../assets/desktop-mem-1.png";
import acerRedMonitor from "./../../../assets/acer-red-monitor.png";
import acerBlueMonitor from "./../../../assets/acer-blue-monitor.png";

const promos = [
  {
    id: "promo-1",
    title: "EZ-77 PC Worldwide",
    subtitle: 'MF841HN/A 13"',
    label: "Starting at",
    price: "$1,750",
    image: vrPromo,
  },
  {
    id: "promo-2",
    title: "Limited Weekly Discount",
    subtitle: null,
    label: "Discount -30%",
    price: "$349",
    image: headsetPromo,
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
    images: [gamingGlassCPU, gamingGlassCPU1],
  },
  {
    id: 3,
    category: "Premium Laptops",
    name: 'MBD214 147GB 10000 RPM 16MB Cache SAS 6Gb/s 2.5" Hard Drive',
    price: 2330,
    badge: null,
    images: [HDD, HDD1],
  },
  {
    id: 4,
    category: "Premium Laptops",
    name: "FTW-3553 8GB 2666MHz DDR4 DIMM Desktop Memory",
    price: 1280,
    badge: null,
    images: [desktopMem, desktopMem1],
  },
  {
    id: 5,
    category: "Premium Laptops",
    name: "High Definition Monitor Red/Blue Expo SDS-855697",
    price: 1490,
    badge: "SOLD",
    images: [acerRedMonitor, acerBlueMonitor],
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
