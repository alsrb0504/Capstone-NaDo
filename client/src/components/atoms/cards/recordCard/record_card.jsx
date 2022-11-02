import React from 'react';

const RecordCard = ({ info, handleClick }) => {
  const { place, date, price, isOrder } = info;

  const OnClick = () => {
    handleClick();
  };

  return (
    <div className="card-container result-card" onClick={OnClick}>
      <div className="info">
        <h3>{place}</h3>
        <p className="date">배달 일시 : {date}</p>
        <p>
          {isOrder && <span>주문 금액 : </span>}
          {!isOrder && <span className="deliver">배달료 : </span>}
          <span className={!isOrder ? 'deliver' : ''}>{price} 원</span>
        </p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default RecordCard;
