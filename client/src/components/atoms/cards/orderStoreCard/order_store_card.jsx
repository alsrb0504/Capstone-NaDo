import React from 'react';

const OrderStoreCard = ({ info, handleClick }) => {
  const { name, image, businesstimes } = info;

  const SelectCard = () => {
    handleClick(name);
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
          businesstimes.length ? 'fa-store' : 'fa-store-slash'
        }`}
      />
    </div>
  );
};

export default OrderStoreCard;
