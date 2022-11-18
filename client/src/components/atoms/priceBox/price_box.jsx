import React from 'react';

const PriceBox = ({ text, price, color }) => (
  <div className={`price-box price-box-${color}`}>
    <p>{text}</p>
    <p>{price}원</p>
  </div>
);

export default PriceBox;
