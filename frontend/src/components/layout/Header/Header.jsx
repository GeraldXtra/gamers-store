import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const pagesDropdownLinks = [
  { label: "About Us", to: "/about" },
  { label: "FAQ Page", to: "/faq" },
  { label: "Terms & Conditions", to: "/terms-conditions" },
  { label: "Contact Us", to: "/contact-us" },
  { label: "Get In Touch", to: "/get-in-touch" },
  { label: "Store Locator", to: "/store-locator" },
  { label: "Pricing Plans", to: "/pricing-plans" },
];

const categoryOptions = [
  "All Categories",
  "Gaming Mouse",
  "Gaming Keyboard",
  "Graphic Cards",
  "Headphones",
  "Monitors",
];

const navLinkClass = ({ isActive }) => (isActive ? "gs-main-nav-active" : "");

const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setIsCategoryOpen(false);
  };

  const handleSearchSubmit = () => {
    // TODO: navigate to /shop?search=...&category=... once Shop supports query filtering
    console.log("Search:", searchValue, "in", selectedCategory);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  return (
    <header className="gs-header-wrapper">
      {/* Row 1 — light utility bar */}
      <div className="gs-topbar">
        <div className="gs-topbar-inner">
          <div className="gs-topbar-left">
            <NavLink to="/" end className="gs-logo">
              Gamers Store<span>.</span>
            </NavLink>
          </div>

          <div className="gs-search-bar">
            <div
              className="gs-category-select"
              ref={categoryRef}
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              <span>{selectedCategory}</span>
              <i className="bi bi-chevron-down"></i>

              {isCategoryOpen && (
                <div className="gs-category-dropdown">
                  {categoryOptions.map((cat) => (
                    <span key={cat} onClick={() => handleSelectCategory(cat)}>
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Search for Product..."
              className="gs-search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />

            <button
              className="gs-search-submit"
              onClick={handleSearchSubmit}
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>

          <div className="gs-topbar-icons">
            <button className="gs-icon-btn" aria-label="Compare">
              <i className="bi bi-arrow-left-right"></i>
            </button>
            <NavLink to="/login" className="gs-icon-btn" aria-label="Account">
              <i className="bi bi-person"></i>
            </NavLink>
            <NavLink
              to="/wishlist"
              className="gs-icon-btn"
              aria-label="Wishlist"
            >
              <i className="bi bi-heart"></i>
            </NavLink>
            <NavLink to="/checkout" className="gs-cart-link" aria-label="Cart">
              <span className="gs-cart-icon-wrap">
                <i className="bi bi-cart2"></i>
                <span className="gs-cart-badge">0</span>
              </span>
              <span className="gs-cart-total">$0</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Row 2 — blue nav bar */}
      <div className="gs-navbar">
        <div className="gs-navbar-inner">
          <nav className="gs-main-nav">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <div className="gs-dropdown-wrap">
              <span className="gs-page-trigger">Pages</span>
              <div className="gs-dropdown-menu">
                {pagesDropdownLinks.map((link) => (
                  <NavLink key={link.to} to={link.to}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
          </nav>

          <NavLink to="/shop" className="gs-weekly-discount">
            Weekly Discount <i className="bi bi-chevron-right"></i>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
