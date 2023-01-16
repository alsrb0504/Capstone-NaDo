/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MakeOptionText, PrintPrice } from '../../../../utils/text';

function isSame(prev, next) {
  // if (prev.UpdateMenu !== next.UpdateMenu) return false;

  console.log(prev);
  console.log(next);

  if (prev.DeleteMenu !== next.DeleteMenu) return false;

  // if (prev.UpdateMenu !== next.UpdateMenu) return false;

  return true;
}

const OrderingCardComponent = ({ info, UpdateMenu, DeleteMenu }) => {
  const { menuSequence, menuName, menuOptions, menuPrice, cnt } = info;
  const { icehot, shots } = menuOptions;

  const [curCnt, setCurCnt] = useState(cnt);

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

  const DeleteCard = () => {
    DeleteMenu(menuSequence);
  };

  return (
    <div className="card-container order-card ordering cart-card">
      <div className="cart-trash-can-icon" onClick={DeleteCard}>
        <img src="/icon/trash_can_icon.svg" alt="지우기 아이콘" />
      </div>

      <div className="info">
        <h3 className="menu-name">{menuName}</h3>
        <p className="options">옵션 : {MakeOptionText(icehot, shots)}</p>

        <p>{PrintPrice(menuPrice)} 원</p>
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

const OrderingCard = React.memo(OrderingCardComponent, isSame);

export default OrderingCard;
