import React from 'react';
import { PrintPrice } from '../../../../utils/text';

const PickupReadyCard = ({ info, handleClick }) => {
  const { pickupAddress, pickupTime, pickupPrice } = info;

  const OnClick = () => {
    handleClick();
  };

  return (
    <div className="card-container pickup-ready-card" onClick={OnClick}>
      <div className="info">
        <h3>{pickupAddress}</h3>
        <p className="date">마감 시간 : ~ {pickupTime}</p>
        <p>
          <span>주문 금액 : {PrintPrice(pickupPrice)} 원</span>
        </p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default PickupReadyCard;
