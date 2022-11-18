import React from 'react';
import { PrintPrice } from '../../../../utils/text';
import { ChangeTimeInfo } from '../../../../utils/time';

const PickingCard = ({ info, MoveDesc }) => {
  const { orderAddress, pickupSequence, orderTimeout, totalPrice } = info;
  // 이름 중복
  const { address, detail } = orderAddress;

  // 주문 상세 정보로 이동
  const GoDesc = () => {
    MoveDesc(pickupSequence);
  };

  return (
    <div className="card-container ordering-card">
      <div className="order-info" onClick={GoDesc}>
        <div className="info">
          <h3>
            {address} {detail}
          </h3>
          <p>
            마감 시간 : <span>~ {ChangeTimeInfo(orderTimeout)}</span>
          </p>
          <p>
            주문 금액 : <span>{PrintPrice(totalPrice)} 원</span>
          </p>
        </div>

        <i className="fa-solid fa-chevron-right" />
      </div>

      <button type="button" onClick={GoDesc}>
        주문 상세 정보 보기
      </button>
    </div>
  );
};
export default PickingCard;
