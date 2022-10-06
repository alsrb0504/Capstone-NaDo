import React from "react";

const OrderingCard = ({ info, handleDesc, handleChat }) => {
  const { place, date, price, picker } = info;

  // 주문 상세 정보로 이동
  const onDesc = () => {
    handleDesc();
  };

  // 채팅하기로 이동
  const goChat = () => {
    // picker
    handleChat(picker);
  };

  return (
    <div className="card-container ordering-card">
      <div className="order-info" onClick={onDesc}>
        <div className="info">
          <h3>{place}</h3>
          <p className="date">배달 일시 : {date}</p>
          <p>
            주문 금액 : <span>{price} 원</span>
          </p>
        </div>

        <i className="fa-solid fa-chevron-right"></i>
      </div>

      <button onClick={goChat}>피커와 채팅하기</button>
    </div>
  );
};
export default OrderingCard;
