import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import PagePlaceholder from "./components/common/PagePlaceholder/PagePlaceholder";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import FloatingActions from "./components/layout/FloatingActions/FloatingActions";
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar";

function App() {
  return (
    <div className="app-layout">
      <AnnouncementBar />
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<PagePlaceholder title="About Us" />} />
          <Route path="/faq" element={<PagePlaceholder title="FAQ" />} />
          <Route
            path="/terms-conditions"
            element={<PagePlaceholder title="Terms and Conditions" />}
          />
          <Route
            path="/contact-us"
            element={<PagePlaceholder title="Contact Us" />}
          />
          <Route
            path="/get-in-touch"
            element={<PagePlaceholder title="Get In Touch" />}
          />
          <Route
            path="/store-locator"
            element={<PagePlaceholder title="Store Locator" />}
          />
          <Route
            path="/pricing-plans"
            element={<PagePlaceholder title="Pricing Plans" />}
          />
          <Route
            path="/product/:id"
            element={<PagePlaceholder title="Product Detail" />}
          />
          <Route path="/login" element={<PagePlaceholder title="Login" />} />
          <Route path="/signup" element={<PagePlaceholder title="Sign Up" />} />
          <Route
            path="/account-settings"
            element={<PagePlaceholder title="Account Settings" />}
          />
          <Route
            path="/checkout"
            element={<PagePlaceholder title="Checkout" />}
          />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;
