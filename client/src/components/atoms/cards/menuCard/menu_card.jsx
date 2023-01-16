import React from 'react';
import { PrintPrice } from '../../../../utils/text';

const MenuCard = ({ menuInfo, HandleClick }) => {
  const { menuName, menuPrice, menuImg } = menuInfo;

  const OnClick = () => {
    HandleClick(menuInfo);
  };

  return (
    <div className="card-container menu-card" onClick={OnClick}>
      <div className="menu-card-info">
        <h3>{menuName}</h3>
        <p>{PrintPrice(menuPrice)} 원</p>
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
