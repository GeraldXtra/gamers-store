// import maestroCard from "./../../../assets/maestro.jpg";
// import masterCard from "./../../../assets/mastercard.jpg";
// import visaCard from "./../../../assets/visacard.jpg";
// import payPal from "./../../../assets/paypal.jpg";
import "./Footer.css";

const PaymentCards = (props) => {
  return (
    <>
      <img src={props.image} alt={props.title} />
    </>
  );
};

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-sub">
          <div className="footer-news-letter">
            <h2 className="footer-newsletter-title">Sign up to News Letter</h2>
            <div className="footer-email-input">
              <input type="text" placeholder="your email address" required />
              <i className="bi bi-envelope"></i>
            </div>

            <div className="footer-follow">
              <h2>Follow us on:</h2>
              <div className="footer-follow-icons">
                <i className="bi bi-spotify"></i>
                <i className="bi bi-youtube"></i>
                <i className="bi bi-twitter-x"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-facebook"></i>
              </div>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h2>Delivery Terms</h2>
              <p>Payment Terms</p>
              <p>Payment & Pricing</p>
              <p>Terms of use</p>
              <p>Privacy & Policy</p>
            </div>
            <div>
              <h2>Get Involved</h2>
              <p>About Us</p>
              <p>Orders & Shipping</p>
              <p>Contact Us</p>
              <p>Customer Service</p>
            </div>
            <div>
              <h2>Quick Links</h2>
              <p>Gaming Keyboard</p>
              <p>Game Pad</p>
              <p>Gaming Desktop</p>
              <p>Headphones</p>
              <p>Gaming Laptops</p>
            </div>
            <div>
              <h2>Customer Care</h2>
              <p>My Account</p>
              <p>Store Locator</p>
              <p>Customer Service</p>
              <p>FAQs</p>
            </div>
          </div>
          <div className="footer-contact">
            <h2>
              Gamers Store <span>.</span>
            </h2>
            <div>
              <i className="bi bi-headset"></i>
              <h2>
                <span className="phone-highlight">+0080 1234 56 789</span>
              </h2>
            </div>
            <div>
              <i className="bi bi-truck"></i>
              <h2>Amounts Over $100</h2>
            </div>
            <h1>Save up to 20%</h1>
          </div>
          <div className="footer-message">
            <p>&copy; 2026, All Rights Reserved</p>
            <div className="footer-payment-cards">
              {/* <PaymentCards image={maestroCard} title="Maestro Card" />
              <PaymentCards image={masterCard} title="Master Card" />
              <PaymentCards image={visaCard} title="Visa Card" />
              <PaymentCards image={payPal} title="Paypal" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
