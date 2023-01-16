import React, { useCallback } from 'react';
import useMove from '../../../hooks/useMove';
import BtnBox from '../../atoms/buttons/btnBox/btn_box';

const HomeMenus = React.memo(() => {
  const { HandleMove } = useMove();

  const MoveOrderHistory = useCallback(
    () => HandleMove('/setting/order_history'),
    [HandleMove],
  );
  const MovePickupHistory = useCallback(
    () => HandleMove('/setting/income_calculate'),
    [HandleMove],
  );
  const MoveSetting = useCallback(() => HandleMove('/setting'), [HandleMove]);
  const MoveCart = useCallback(() => HandleMove('/order/cart'), [HandleMove]);

  return (
    <div className="home-menus col-sm-4">
      <h3>메뉴</h3>
      <div className="home-menus-btns">
        <BtnBox
          text="주문 내역"
          url="icon/order_list_icon.svg"
          HandleClick={MoveOrderHistory}
        />
        <BtnBox
          text="픽업 내역"
          url="icon/pickup_list_icon.svg"
          HandleClick={MovePickupHistory}
        />
        <BtnBox
          text="설정"
          url="icon/setting_icon.svg"
          HandleClick={MoveSetting}
        />
        <BtnBox
          text="장바구니"
          url="icon/cart_icon.svg"
          HandleClick={MoveCart}
        />
      </div>
    </div>
  );
});

export default HomeMenus;
