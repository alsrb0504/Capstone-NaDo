/* eslint-disable no-unused-vars */
import React from 'react';

const PickingCard = ({ info, MoveDesc }) => {
  const { orderAddress, orderSequence, orderTimeout, totalPrice } = info;
  const { address, detail } = orderAddress;

  // 주문 상세 정보로 이동
  const GoDesc = () => {
    MoveDesc(orderSequence);
  };

  // 채팅하기로 이동
  const GoChat = () => {
    // orderer
    alert('채팅하기 미구현(주문 상세 페이지 이동으로 변경?)');
  };

  const ChangeTimeInfo = (timeInfo) => {
    const date = new Date(timeInfo);
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour < 10 ? `0${hour}` : hour} : ${
      minute < 10 ? `0${minute}` : minute
    }`;
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
            주문 금액 : <span>{totalPrice} 원</span>
          </p>
        </div>

        <i className="fa-solid fa-chevron-right" />
      </div>

      <button type="button" onClick={GoChat}>
        피커와 채팅하기
      </button>
    </div>
  );
};
export default PickingCard;
