import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="gs-header">
        <div className="gs-sub-header">
          <div className="gs-header-nav">
            <h2>
              Gamers Store <span>.</span>
            </h2>
            <nav>
              <a href="#">Home</a>
              <a href="#">Pages</a>
              <a href="#">Shop</a>
            </nav>
          </div>
          <div className="gs-icons">
            <i className="bi bi-search"></i>
            <i className="bi bi-person"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-cart2"></i>
            <p>$0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
