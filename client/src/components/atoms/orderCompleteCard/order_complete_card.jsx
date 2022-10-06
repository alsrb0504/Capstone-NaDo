import React from "react";

const OrderCompleteCard = ({ info }) => {
  const { name, options, price, cnt } = info;

  // 추후, 이 함수를 다른 곳에서 만들어서 사용할 지 결정.
  const MakeOptionText = (ops) => {
    if (ops.length === 0) return "없음";

    let txt = "";

    ops.forEach((option, idx) => {
      txt += option;
      if (idx !== ops.length - 1) txt += ", ";
    });

    return txt;
  };

  return (
    <div className="card-container order-card ordering">
      <div className="info">
        <h3>{name}</h3>
        <p className="options">옵션 : {MakeOptionText(options)}</p>
        <p>{price} 원</p>
      </div>

      <div className="order-count">
        <span className="count-title">수량 : </span>
        <span className="cnt">{cnt}</span>
      </div>
    </div>
  );
};

export default OrderCompleteCard;
