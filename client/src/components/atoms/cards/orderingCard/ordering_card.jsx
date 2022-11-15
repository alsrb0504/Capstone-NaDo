/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PrintPrice } from '../../../../utils/text';

const OrderingCard = ({ info, UpdateMenu }) => {
  const { menuSequence, menuName, menuOptions, menuPrice, cnt } = info;
  const { icehot, shots } = menuOptions;

  const optionText = `${icehot.toUpperCase()} ${
    shots > 0 ? `, 샷 추가(+${500 * shots}원)` : ''
  }`;

  // 추후 hook 으로 교체.
  const [curCnt, setCurCnt] = useState(cnt);
  const [curPrice, setCurPrice] = useState(menuPrice);

  const ChangeCount = (e) => {
    const target = e.target.className.split(' ')[1];
    if (target === 'fa-plus') {
      const increaseCnt = curCnt + 1;
      setCurCnt(increaseCnt);
      UpdateMenu(menuSequence, increaseCnt);
    } else {
      const decreaseCnt = curCnt > 1 ? curCnt - 1 : curCnt;
      setCurCnt(decreaseCnt);
      UpdateMenu(menuSequence, decreaseCnt);
    }
  };

  return (
    <div className="card-container order-card ordering">
      <div className="info">
        <h3>{menuName}</h3>
        <p className="options">옵션 : {optionText}</p>
        <p>{PrintPrice(curPrice)} 원</p>
      </div>

      <div className="order-count">
        <span className="count-title">수량 : </span>
        <button type="button" onClick={ChangeCount}>
          <i className="fa-solid fa-plus" />
        </button>
        <span className="cnt">{curCnt}</span>
        <button type="button" onClick={ChangeCount}>
          <i className="fa-solid fa-minus" />
        </button>
      </div>
    </div>
  );
};

export default OrderingCard;
