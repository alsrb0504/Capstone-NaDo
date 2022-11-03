import React from 'react';

const PickupStoreCard = ({ info, handleClick }) => {
  const { name, image, orderCnt } = info;

  const MovePage = () => {
    handleClick();
  };

  return (
    <div className="card-container pickup-store-card" onClick={MovePage}>
      <div className="info">
        <img src={image} alt="가게 이미지" />
        <div className="detail">
          <h3>{name}</h3>
          <span>주문 현황 : {orderCnt}</span>
        </div>
      </div>

      <i className="fa-solid fa-store" />
    </div>
  );
};

export default PickupStoreCard;
