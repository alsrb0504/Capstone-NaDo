import React from 'react';

const HeaderWithLogo = ({ MoveBack, MoveCart }) => (
  <div className="header-with-logo">
    <button type="button" onClick={MoveBack}>
      <i className="fa-solid fa-arrow-left" />
    </button>

    <div className="logo-container">
      <img src="/images/logo.svg" alt="logo_img" />
    </div>

    <button type="button" onClick={MoveCart}>
      <i className="fa-solid fa-cart-shopping" />
    </button>
  </div>
);

export default HeaderWithLogo;
