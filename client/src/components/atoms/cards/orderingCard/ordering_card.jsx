/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { MakeOptionText, PrintPrice } from '../../../../utils/text';

function isSame(prev, next) {
  if (prev.DeleteMenu !== next.DeleteMenu) return false;
  if (prev.UpdateMenu !== next.UpdateMenu) return false;
  // 업데이트 된 커피(object)만 새로 만들기 떄문에 info만 검사해도 문제 없음.
  if (prev.info !== next.info) return false;

  return true;
}

const OrderingCardComponent = ({ info, UpdateMenu, DeleteMenu }) => {
  const { menuSequence, menuName, menuOptions, menuPrice, cnt } = info;
  const { icehot, shots } = menuOptions;

  const ChangeCount = useCallback(
    (e) => {
      const target = e.target.className.split(' ')[1];
      // 카운트 증가
      if (target === 'fa-plus') {
        if (cnt + 1 < 9) UpdateMenu(menuSequence, cnt + 1);
      }
      // 카운트 감소
      else {
        if (cnt - 1 > 0) UpdateMenu(menuSequence, cnt - 1);
      }
    },
    [cnt, menuSequence, UpdateMenu],
  );

  const DeleteCard = useCallback(() => {
    DeleteMenu(menuSequence);
  }, [menuSequence, DeleteMenu]);

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
        <span className="cnt">{cnt}</span>

        <button type="button" onClick={ChangeCount}>
          <i className="fa-solid fa-minus" />
        </button>
      </div>
    </div>
  );
};

const OrderingCard = React.memo(OrderingCardComponent, isSame);

export default OrderingCard;
