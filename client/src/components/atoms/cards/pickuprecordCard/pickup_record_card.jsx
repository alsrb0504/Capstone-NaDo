import React from 'react';

const PickupRecordCard = ({ info, handleClick }) => {
  const { pickupAddress, pickupTime, pickupFee } = info;

  console.log(pickupFee);

  const OnClick = () => {
    handleClick();
  };

  return (
    <div className="card-container pickup-record-card" onClick={OnClick}>
      <div className="info">
        <h3>{pickupAddress}</h3>
        <p className="date">배달 일시 : {pickupTime}</p>
        <p>
          <span className="deliver">배달료 :{pickupFee} 원</span>
        </p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default PickupRecordCard;
