import ProductCard from "../../../common/ProductCard/ProductCard";
import "./WeeklyDiscountDropdown.css";

const weeklyProducts = [
  {
    id: "weekly-1",
    category: "Weekly",
    name: "Wireless PC Mouse XF-550 Black/Grey",
    price: 250,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Mouse+2",
    ],
  },
  {
    id: "weekly-2",
    category: "Weekly",
    name: "X7 Closed-Back Wireless Earbuds",
    price: 345,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Earbuds+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Earbuds+2",
    ],
  },
  {
    id: "weekly-3",
    category: "Weekly",
    name: "Computer Monitor Full HD Red/Black",
    price: 1200,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Monitor+2",
    ],
  },
  {
    id: "weekly-4",
    category: "Weekly",
    name: "Air Purifier Pro With Eco Mode For Office",
    price: 150,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Purifier+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Purifier+2",
    ],
  },
  {
    id: "weekly-5",
    category: "Weekly",
    name: "Black Smartphone 128GB Storage",
    price: 125,
    badge: null,
    images: [
      "https://placehold.co/300x300/1a1a1a/666666?text=Phone+1",
      "https://placehold.co/300x300/1a1a1a/666666?text=Phone+2",
    ],
  },
];

const WeeklyDiscountDropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`weekly-discount-dropdown ${
        isOpen ? "weekly-discount-dropdown-open" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="weekly-discount-dropdown-grid">
        {weeklyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyDiscountDropdown;
