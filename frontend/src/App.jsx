import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import PagePlaceholder from "./components/common/PagePlaceholder/PagePlaceholder";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import FloatingActions from "./components/layout/FloatingActions/FloatingActions";
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar";
import About from "./pages/About/About";
import TermsAndCondition from "./pages/TermsAndConditions/TermsAndConditions";
import StoreLocator from "./pages/StoreLocator/StoreLocator";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ContactUs from "./pages/ContactUs/ContactUs";
import FaqPage from "./pages/FAQ/Faq";

function App() {
  return (
    <div className="app-layout">
      <AnnouncementBar />
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About title="About Us" />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/terms-conditions" element={<TermsAndCondition />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route
                path="/get-in-touch"
                element={<PagePlaceholder title="Get In Touch" />}
              />
              <Route path="/store-locator" element={<StoreLocator />} />
              <Route
                path="/product/:id"
                element={<PagePlaceholder title="Product Detail" />}
              />
              <Route
                path="/login"
                element={<PagePlaceholder title="Login" />}
              />
              <Route
                path="/signup"
                element={<PagePlaceholder title="Sign Up" />}
              />
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
        </CartProvider>
      </AuthProvider>
      <FloatingActions />
    </div>
  );
}

export default App;
