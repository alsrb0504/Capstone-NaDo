import React from 'react';
import { CalcOpenTime } from '../../../../utils/time';

const OrderStoreCard = ({ info, handleClick }) => {
  const { sequence, name, image, businesstimes } = info;
  const { startTime, endTime } = businesstimes[0];

  const SelectCard = () => {
    handleClick(sequence);
  };

  return (
    <div className="card-container order-store-card" onClick={SelectCard}>
      <div className="info">
        <img
          src={image || '/images/cafeImg/default_cafe_img.jpg'}
          alt="가게 이미지"
        />
        <div className="name-box">
          <h3>{name}</h3>
          <span className="bar" />
        </div>
      </div>

      <i
        className={`fa-solid ${
          CalcOpenTime(startTime, endTime) ? 'fa-store' : 'fa-store-slash'
        }`}
      />
    </div>
  );
};

export default OrderStoreCard;
