import "./AnnouncementBar.css";

const AnnouncementBar = () => {
  return (
    <>
      <div className="ab-main">
        <div className="ab-sub-main">
          <div className="ab-message">
            <i className="bi bi-card-heading"></i>
            <p>Welcome to worldwide Gamers Store</p>
          </div>

          <div className="ab-links">
            <div className="ab-locator">
              <i className="bi bi-geo-alt"></i>
              <p>Store Locator</p>
            </div>
            <div className="ab-shipping">
              <i className="bi bi-truck"></i>
              <p>Free Shipping & Returns</p>
            </div>
            <div className="ab-account">
              <i className="bi bi-person-fill"></i>
              <p>My Account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBar;
