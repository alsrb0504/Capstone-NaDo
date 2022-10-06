import React from "react";

const PickupReadyCard = ({ info, handleClick }) => {
  const { place, date, price } = info;

  const onClick = () => {
    handleClick();
  };

  return (
    <div className="card-container pickup-ready-card" onClick={onClick}>
      <div className="info">
        <h3>{place}</h3>
        <p className="date">마감 시간 : ~ {date}</p>
        <p>
          <span>주문 금액 : {price} 원</span>
        </p>
      </div>

      <i className="fa-solid fa-chevron-right"></i>
    </div>
  );
};

export default PickupReadyCard;
