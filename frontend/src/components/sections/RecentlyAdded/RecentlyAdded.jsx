import ProductCard from "../../common/ProductCard/ProductCard";
import "./RecentlyAdded.css";

const products = [
  {
    id: 1,
    category: "Fitbit",
    name: "Wireless PC Mouse XF-550 in Carbon Black",
    price: 290,
    badge: "SOLD",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+2",
    ],
  },
  {
    id: 2,
    category: "Fitbit",
    name: "CPU Air Cooler FP130 Fan Anodized Metal",
    price: 155,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Cooler+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Cooler+2",
    ],
  },
  {
    id: 3,
    category: "Fitbit",
    name: "BW-23571 Closed-Back Headphones Pro",
    price: 700,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Headphones+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Headphones+2",
    ],
  },
  {
    id: 4,
    category: "Fitbit",
    name: "Tablet W-56774 Mini Series with Keyboard",
    price: 890,
    badge: "NEW",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Tablet+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Tablet+2",
    ],
  },
  {
    id: 5,
    category: "Fitbit",
    name: "High Definition Web Camera SPX-8962",
    price: 140,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Camera+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Camera+2",
    ],
  },
  {
    id: 6,
    category: "Fitbit",
    name: "FTW-37 256GB DDR4 Desktop Memory",
    price: 1180,
    originalPrice: 1280,
    badge: "SALE",
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=RAM+2",
    ],
  },
  {
    id: 7,
    category: "Fitbit",
    name: "2TB USB 3.1 External Hard Drive Orange",
    price: 210,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=HDD+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=HDD+2",
    ],
  },
  {
    id: 8,
    category: "Fitbit",
    name: "RGB PTP-50 Mechanical Keyboard",
    price: 390,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Keyboard+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Keyboard+2",
    ],
  },
];

const RecentlyAdded = () => {
  return (
    <section className="recently-added">
      <h2 className="recently-added-title">Recently Added</h2>
      <div className="recently-added-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="compact" />
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
