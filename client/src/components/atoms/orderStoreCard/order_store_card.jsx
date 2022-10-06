import React from "react";

const OrderStoreCard = ({ info, handleClick }) => {
  const { name, url, isOpen } = info;

  const MovePage = () => {
    handleClick();
  };

  return (
    <div className="card-container order-store-card" onClick={MovePage}>
      <div className="info">
        <img src={url} alt="가게 이미지" />
        <div className="name-box">
          <h3>{name}</h3>
          <span className="bar"></span>
        </div>
      </div>

      <i className={`fa-solid ${isOpen ? "fa-store" : "fa-store-slash"}`}></i>
    </div>
  );
};

export default OrderStoreCard;
