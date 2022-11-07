import React from 'react';

const PriceBox = ({ text, price }) => (
    <div className={`price-box price-box-${text}`}>
      <text>{text}</text>
      <text>{price}원</text>
    </div>
);

export default PriceBox;
