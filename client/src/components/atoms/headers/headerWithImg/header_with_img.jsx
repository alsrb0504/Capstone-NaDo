import React from 'react';

const HeaderWithImg = React.memo(({ shopImg, MoveBack, MoveCart }) => (
  <div className="header-with-img">
    <img className="header-with-img-bg" src={shopImg} alt="카페 이미지" />

    <div className="header-nav-bar">
      <button type="button" onClick={MoveBack}>
        <i className="fa-solid fa-arrow-left" />
      </button>

      <button type="button" onClick={MoveCart}>
        <i className="fa-solid fa-cart-shopping" />
      </button>
    </div>
  </div>
));

export default HeaderWithImg;
