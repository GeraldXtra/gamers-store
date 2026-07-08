import ProductCard from "../../common/ProductCard/ProductCard";
import "./FeaturedProducts.css";
import GamingConsoleBanner from "./GamingConsoleBanner";

const products = [
  {
    id: 1,
    category: "Premium Audio",
    name: "RX 6600 Core 8GB GDDR6 Graphics Card",
    price: 990,
    badge: "SOLD",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=GPU+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=GPU+2",
    ],
  },
  {
    id: 2,
    category: "Premium Audio",
    name: "High-Airflow C-10 Computer Case",
    price: 3850,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Case+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Case+2",
    ],
  },
  {
    id: 3,
    category: "Premium Audio",
    name: "Led 4K Smart TV Expo GSX-10007 White",
    price: 1590,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=TV+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=TV+2",
    ],
  },
  {
    id: 4,
    category: "Premium Audio",
    name: "FTW-3553 8GB DDR4 Desktop Memory",
    price: 1280,
    badge: "NEW",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+2",
    ],
  },
  {
    id: 5,
    category: "Premium Audio",
    name: "Headphones FX-990 Plus Blue Black",
    price: 890,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Headphones+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Headphones+2",
    ],
  },
  {
    id: 6,
    category: "Premium Audio",
    name: "Core 6100 3.70 GHz 3M Cache Processor",
    price: 1860,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=CPU+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=CPU+2",
    ],
  },
  {
    id: 7,
    category: "Premium Audio",
    name: "Power Supply, 80 Plus, Silver 4.7 inches",
    price: 770,
    badge: "SOLD",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=PSU+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=PSU+2",
    ],
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <h2 className="featured-products-title">Featured Products</h2>
      <div className="featured-products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <GamingConsoleBanner />
    </section>
  );
};

export default FeaturedProducts;
