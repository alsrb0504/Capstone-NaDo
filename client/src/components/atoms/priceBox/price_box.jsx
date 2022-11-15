import React from 'react';

const PriceBox = ({ text, price }) => (
  <div className={`price-box price-box-${text}`}>
    <q>{text}</q>
    <q>{price}원</q>
  </div>
);

export default PriceBox;
