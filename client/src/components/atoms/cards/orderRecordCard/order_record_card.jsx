import React from 'react';
import { PrintPrice } from '../../../../utils/text';
import { MakeFullTimeInfo } from '../../../../utils/time';

const OrderRecordCard = ({ info, handleClick }) => {
  const { address, addressDetail, deliveredAt, orderSequence, totalPrice } =
    info;

  const OnClick = () => {
    alert('미구현');

    handleClick(orderSequence);
  };

  return (
    <div className="card-container order-record-card" onClick={OnClick}>
      <div className="info">
        <h3>
          {address} {addressDetail}
        </h3>
        <p className="date">배달 일시 : {MakeFullTimeInfo(deliveredAt)}</p>
        <p>주문 금액 : {PrintPrice(totalPrice)} 원</p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default OrderRecordCard;
