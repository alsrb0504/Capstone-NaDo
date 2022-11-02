import React from 'react';

const MenuCard = ({ menuInfo, handleClick }) => {
  const { coffeeName, coffeePrice, coffeeImgUrl } = menuInfo;

  const OnClick = () => {
    handleClick(menuInfo);
  };

  return (
    <div className="card-container menu-card" onClick={OnClick}>
      <div className="menu-card-info">
        <h3>{coffeeName}</h3>
        <p>{coffeePrice} 원</p>
      </div>
      <div className="menu-card-img-container">
        <img
          src={coffeeImgUrl || '/images/default_coffee_2.jpg'}
          alt="커피 이미지"
        />
      </div>
    </div>
  );
};

export default MenuCard;
