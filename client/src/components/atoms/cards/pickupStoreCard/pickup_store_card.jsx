import React, { useCallback } from 'react';

const PickupStoreCard = ({ info, HandleClick }) => {
  const { sequence, name, image, pickupCnt } = info;

  const MovePage = useCallback(() => {
    HandleClick(sequence);
  }, [sequence, HandleClick]);

  return (
    <div className="card-container pickup-store-card" onClick={MovePage}>
      <div className="info">
        <img
          src={image || '/images/cafeImg/default_cafe_img.jpg'}
          alt="가게 이미지"
        />
        <div className="detail">
          <h3>{name}</h3>
          <span>주문 현황 : {pickupCnt}</span>
        </div>
      </div>

      <i className="fa-solid fa-store" />
    </div>
  );
};

export default PickupStoreCard;
