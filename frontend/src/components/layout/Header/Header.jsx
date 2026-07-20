import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import WeeklyDiscountDropdown from "./WeeklyDiscountDropdown/WeeklyDiscountDropdown"
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
const mobileNavLinkClass = ({ isActive }) =>
  `gs-mobile-nav-link ${isActive ? "gs-main-nav-active" : ""}`;

const WEEKLY_CLOSE_DELAY = 150;

const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false);
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false);
  const categoryRef = useRef(null);
  const headerRef = useRef(null);
  const weeklyCloseTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutsideMobile = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
        setIsMobilePagesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobile);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => clearTimeout(weeklyCloseTimeoutRef.current);
  }, []);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setIsCategoryOpen(false);
  };

  const handleSearchSubmit = () => {
    console.log("Search:", searchValue, "in", selectedCategory);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobilePagesOpen(false);
  };

  const openWeeklyDropdown = () => {
    clearTimeout(weeklyCloseTimeoutRef.current);
    setIsWeeklyOpen(true);
  };

  const closeWeeklyDropdown = () => {
    weeklyCloseTimeoutRef.current = setTimeout(() => {
      setIsWeeklyOpen(false);
    }, WEEKLY_CLOSE_DELAY);
  };

  return (
    <header className="gs-header-wrapper" ref={headerRef}>
      {/* Row 1 — light utility bar */}
      <div className="gs-topbar">
        <div className="gs-topbar-inner">
          <div className="gs-topbar-left">
            <button
              className="gs-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <i
                className={`bi ${isMobileMenuOpen ? "bi-x-lg" : "bi-list"}`}
              ></i>
            </button>

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

          <div className="gs-weekly-discount-wrap">
            <NavLink
              to="/shop"
              className="gs-weekly-discount"
              onMouseEnter={openWeeklyDropdown}
              onMouseLeave={closeWeeklyDropdown}
            >
              Weekly Discount
              <span className="gs-weekly-discount-icon">
                <i className="bi bi-chevron-right gs-weekly-discount-icon-chevron"></i>
                <i className="bi bi-plus-lg gs-weekly-discount-icon-plus"></i>
              </span>
            </NavLink>

            <WeeklyDiscountDropdown
              isOpen={isWeeklyOpen}
              onMouseEnter={openWeeklyDropdown}
              onMouseLeave={closeWeeklyDropdown}
            />
          </div>
        </div>
      </div>

      {/* Mobile nav panel — new, only renders/functions below 768px via CSS */}
      <div
        className={`gs-mobile-nav-panel ${
          isMobileMenuOpen ? "gs-mobile-nav-open" : ""
        }`}
      >
        <NavLink
          to="/"
          end
          className={mobileNavLinkClass}
          onClick={closeMobileMenu}
        >
          Home
        </NavLink>

        <div className="gs-mobile-pages-wrap">
          <button
            className="gs-mobile-pages-trigger"
            onClick={() => setIsMobilePagesOpen((prev) => !prev)}
          >
            <span>Pages</span>
            <i
              className={`bi bi-chevron-down gs-mobile-pages-chevron ${
                isMobilePagesOpen ? "gs-mobile-pages-chevron-open" : ""
              }`}
            ></i>
          </button>

          <div
            className={`gs-mobile-pages-list ${
              isMobilePagesOpen ? "gs-mobile-pages-list-open" : ""
            }`}
          >
            {pagesDropdownLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={closeMobileMenu}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <NavLink
          to="/shop"
          className={mobileNavLinkClass}
          onClick={closeMobileMenu}
        >
          Shop
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
