import React, { useCallback } from 'react';
import { PrintPrice } from '../../../../utils/text';
import { ChangeTimeInfo } from '../../../../utils/time';

const PickupReadyCard = ({ info, handleClick }) => {
  const { orderSequence, dest, orderTimeout, price } = info;

  const OnClick = useCallback(() => {
    handleClick(orderSequence);
  }, [orderSequence, handleClick]);

  return (
    <div className="card-container pickup-ready-card" onClick={OnClick}>
      <div className="info">
        <h3>{dest}</h3>
        <p className="date">마감 시간 : ~ {ChangeTimeInfo(orderTimeout)}</p>
        <p>
          <span>주문 금액 : {PrintPrice(price)} 원</span>
        </p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default PickupReadyCard;
