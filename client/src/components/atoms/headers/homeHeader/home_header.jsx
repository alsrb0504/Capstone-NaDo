import React from 'react';

const HomeHeader = React.memo(({ MoveSetting }) => (
  <div className="home-header">
    <div className="home-header-top">
      <div className="home-header-logo-container">
        <img src="/images/logo.svg" alt="logo_img" />
      </div>
      <button type="button" onClick={MoveSetting}>
        <i className="fa-solid fa-gear" />
      </button>
    </div>
    <div className="home-header-coffee-container">
      <img src="/images/coffee.svg" alt="커피 이미지" />
    </div>
  </div>
));

export default HomeHeader;
