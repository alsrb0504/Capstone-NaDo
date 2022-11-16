import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtnBox from '../../atoms/buttons/btnBox/btn_box';

const HomeMenus = () => {
  const navigate = useNavigate();

  const MoveOrderHistory = () => navigate('/setting/order_history');
  const MovePickupHistory = () => navigate('/setting/income_calculate');
  const MoveSetting = () => navigate('/setting');
  const MoveCart = () => navigate('/order/cart');


  return (
    <div className="home-menus col-sm-4">
      <h3>메뉴</h3>
      <div className="home-menus-btns">
        <BtnBox
          text="주문 내역"
          url="icon/order_list_icon.svg"
          handleClick={MoveOrderHistory}
        />
        <BtnBox
          text="픽업 내역"
          url="icon/pickup_list_icon.svg"
          handleClick={MovePickupHistory}
        />
        <BtnBox
          text="설정"
          url="icon/setting_icon.svg"
          handleClick={MoveSetting}
        />
        <BtnBox
          text="장바구니"
          url="icon/cart_icon.svg"
          handleClick={MoveCart}
        />
      </div>
    </div>
  );
};

export default HomeMenus;
