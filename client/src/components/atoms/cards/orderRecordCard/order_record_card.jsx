import React from 'react';

const OrderRecordCard = ({ info, handleClick }) => {
  const { orderAddress, orderTime, orderPrice } = info;

  const OnClick = () => {
    handleClick();
  };

  return (
    <div className="card-container order-record-card" onClick={OnClick}>
      <div className="info">
        <h3>{orderAddress}</h3>
        <p className="date">배달 일시 : {orderTime}</p>
        <p>주문 금액 :{orderPrice} 원</p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default OrderRecordCard;
