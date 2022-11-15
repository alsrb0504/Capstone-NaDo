import React from 'react';
import { MakeOptionText } from '../../../../utils/text';

const OrderCompleteCard = ({ info }) => {
  const { menu, menuPrice, productQuantity, iceOrHot, shots } = info;

  return (
    <div className="card-container order-card ordering">
      <div className="info">
        <h3>{menu.menuName}</h3>
        <p className="options">옵션 : {MakeOptionText(iceOrHot, shots)}</p>
        <p>{menuPrice} 원</p>
      </div>

      <div className="order-count">
        <span className="count-title">수량 : </span>
        <span className="cnt">{productQuantity}</span>
      </div>
    </div>
  );
};

export default OrderCompleteCard;
