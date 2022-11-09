import React from 'react';

const MenuCard = ({ menuInfo, handleClick }) => {
  const { sequence, menuName, menuPrice, menuImg } = menuInfo;

  const OnClick = () => {
    handleClick(sequence);
  };

  return (
    <div className="card-container menu-card" onClick={OnClick}>
      <div className="menu-card-info">
        <h3>{menuName}</h3>
        <p>{menuPrice} 원</p>
      </div>
      <div className="menu-card-img-container">
        <img
          src={menuImg || '/images/default_coffee_2.jpg'}
          alt="커피 이미지"
        />
      </div>
    </div>
  );
};

export default MenuCard;
