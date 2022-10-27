import React from 'react';

// eslint-disable-next-line no-unused-vars
const HeaderWithImg = ({ bg, MoveBack, MoveCart }) => (
  <div className="header-with-img">
    <button type="button" onClick={MoveBack}>
      <i className="fa-solid fa-arrow-left" />
    </button>

    <button type="button" onClick={MoveCart}>
      <i className="fa-solid fa-cart-shopping" />
    </button>
  </div>
);

export default HeaderWithImg;
