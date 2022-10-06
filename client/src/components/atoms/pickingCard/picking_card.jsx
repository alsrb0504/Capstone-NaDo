import React from "react";

const PickingCard = ({ info, handleDesc, handleChat }) => {
  const { place, date, price, picker } = info;

  // 주문 상세 정보로 이동
  const GoDesc = () => {
    handleDesc();
  };

  // 채팅하기로 이동
  const GoChat = () => {
    // picker
    handleChat(picker);
  };

  return (
    <div className="card-container ordering-card">
      <div className="order-info" onClick={GoDesc}>
        <div className="info">
          <h3>{place}</h3>
          <p className="date">배달 일시 : {date}</p>
          <p>
            주문 금액 : <span>{price} 원</span>
          </p>
        </div>

        <i className="fa-solid fa-chevron-right"></i>
      </div>

      <button onClick={GoChat}>피커와 채팅하기</button>
    </div>
  );
};
export default PickingCard;
