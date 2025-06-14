import React, { useState } from "react";
import "../index.css";

function OpeningBanner({ onOpen }) {
  const [cut, setCut] = useState(false);

  const handleClick = () => {
    setCut(true);
    setTimeout(() => {
      onOpen();
    }, 1500); // wait for animation
  };

  return (
    <div className={`opening-banner ${cut ? "cut" : ""}`}>
      <div className="ribbon" onClick={handleClick}>
        <span className="ribbon-text">🎀 Click to Cut the Ribbon 🎀</span>
      </div>
    </div>
  );
}

export default OpeningBanner;
