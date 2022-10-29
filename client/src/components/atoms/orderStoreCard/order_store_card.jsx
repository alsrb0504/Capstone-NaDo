import React from 'react';

const OrderStoreCard = ({ info, handleClick }) => {
  const { name, url, isOpen } = info;

  const SelectCard = () => {
    handleClick(name);
  };

  return (
    <div className="card-container order-store-card" onClick={SelectCard}>
      <div className="info">
        <img src={url} alt="가게 이미지" />
        <div className="name-box">
          <h3>{name}</h3>
          <span className="bar" />
        </div>
      </div>

      <i className={`fa-solid ${isOpen ? 'fa-store' : 'fa-store-slash'}`} />
    </div>
  );
};

export default OrderStoreCard;
