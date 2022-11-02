import React from 'react';
import useCount from '../../../../hooks/hooks';

const OrderingCard = ({ info, updateCount }) => {
  const { name, options, price, cnt } = info;

  const [count, Increase, Decrease] = useCount(cnt);

  // 추후, 이 함수를 다른 곳에서 만들어서 사용할 지 결정.
  const MakeOptionText = (ops) => {
    if (ops.length === 0) return '없음';

    let txt = '';

    ops.forEach((option, idx) => {
      txt += option;
      if (idx !== ops.length - 1) txt += ', ';
    });

    return txt;
  };

  const ChangeCount = (e) => {
    const target = e.target.className.split(' ')[1];
    if (target === 'fa-plus') Increase();
    else Decrease();

    // 값 변경 시, 장바구니에서 가격 변동도 업데이트가
    // 필요하기 때문에 전달받아서 호출.
    updateCount(count);
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
        <button type="button" onClick={ChangeCount}>
          <i className="fa-solid fa-plus" />
        </button>
        <span className="cnt">{count}</span>
        <button type="button" onClick={ChangeCount}>
          <i className="fa-solid fa-minus" />
        </button>
      </div>
    </div>
  );
};

export default OrderingCard;
