import { useState, useEffect } from "react";

import "./GamersStorePopUp.css";

const GamersStorePopUp = () => {
  const [preventPopup, setPreventPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("gs-popup-open");
    } else {
      document.body.classList.remove("gs-popup-open");
    }

    return () => {
      document.body.classList.remove("gs-popup-open");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className="gs-pop-up-overlay">
        <div className="gs-pop-up-main">
          <img src="image" alt="Image" />
          <div className="gs-pop-up-message">
            <h2>Welcome to Gamers Store.</h2>
            <p>
              Sign Up to get all the latest Gamers Store news, website updates,
              offers and promos.
            </p>

            <div className="gs-pop-up-input">
              <input type="text" placeholder="Type your eMail" />
              <i className="bi bi-chevron-right"></i>
            </div>

            <label className="gs-pop-up-checkbox">
              <input
                type="checkbox"
                checked={preventPopup}
                onChange={(e) => setPreventPopup(e.target.checked)}
              />
              <span>Prevent This Pop-up</span>
            </label>
          </div>
          <i
            className="bi bi-x"
            onClick={() => setIsVisible(false)}
            role="button"
            aria-label="Close popup"
          ></i>
        </div>
      </div>
    </>
  );
};

export default GamersStorePopUp;
