import React from 'react';

const BtnOrder = ({ handleClick }) => {
  const OnClick = () => {
    handleClick();
  };

  return (
    <button type="button" className="btn-order" onClick={OnClick}>
      <img className="icon" src="images/order.svg" alt="order" />
      <span className="name">주문하기</span>
    </button>
  );
};

export default BtnOrder;
