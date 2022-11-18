import React from 'react';
import { PrintPrice } from '../../../../utils/text';
import { ChangeTimeInfo } from '../../../../utils/time';

const PickingCard = ({ info, MoveDesc }) => {
  const { location, sequence, timeout, price } = info;
  const { address, detail } = location;

  // 주문 상세 정보로 이동
  const GoDesc = () => {
    MoveDesc(sequence);
  };

  return (
    <div className="card-container ordering-card">
      <div className="order-info" onClick={GoDesc}>
        <div className="info">
          <h3>
            {address} {detail}
          </h3>
          <p>
            마감 시간 : <span>~ {ChangeTimeInfo(timeout)}</span>
          </p>
          <p>
            주문 금액 : <span>{PrintPrice(price)} 원</span>
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
