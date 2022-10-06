import React from "react";

const PickupStoreCard = ({ info, handleClick }) => {
  const { name, url, orderCnt, isOpen } = info;

  const MovePage = () => {
    handleClick();
  };

  return (
    <div className="card-container pickup-store-card" onClick={MovePage}>
      <div className="info">
        <img src={url} alt="가게 이미지" />
        <div className="detail">
          <h3>{name}</h3>
          <span>주문 현황 : {orderCnt}</span>
        </div>
      </div>

      <i className={`fa-solid ${isOpen ? "fa-store" : "fa-store-slash"}`}></i>
    </div>
  );
};

export default PickupStoreCard;
