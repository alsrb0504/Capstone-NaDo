import React from 'react';

const HeaderWithImg = ({ shopImg, MoveBack, MoveCart }) => (
  <div className="header-with-img">
    <img className="header-with-img-bg" src={shopImg} alt="카페 이미지" />

    <button type="button" onClick={MoveBack}>
      <i className="fa-solid fa-arrow-left" />
    </button>

    <button type="button" onClick={MoveCart}>
      <i className="fa-solid fa-cart-shopping" />
    </button>
  </div>
);

export default HeaderWithImg;
