import React from 'react';

const MenuCard = ({ menuInfo }) => {
  const { coffeeName, coffeePrice, coffeeImgUrl } = menuInfo;

  console.log(menuInfo);

  return (
    <div className="card-container menu-card">
      <div className="menu-card-info">
        <h3>{coffeeName}</h3>
        <p>{coffeePrice} 원</p>
      </div>
      <div className="menu-card-img-container">
        <img src={coffeeImgUrl} alt="커피 이미지" />
      </div>
    </div>
  );
};

export default MenuCard;
