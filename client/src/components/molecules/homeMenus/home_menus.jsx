import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtnBox from '../../atoms/btnBox/btn_box';

const HomeMenus = () => {
  const navigate = useNavigate();

  const MoveChat = () => {
    navigate('/');
  };

  return (
    <div className="home-menus col-sm-4">
      <h3>메뉴</h3>
      <div className="home-menus-btns">
        <BtnBox
          text="주문 내역"
          url="/images/signup_icon.svg"
          handleClick={MoveChat}
        />
        <BtnBox
          text="주문 내역"
          url="/images/signup_icon.svg"
          handleClick={MoveChat}
        />
        <BtnBox
          text="주문 내역"
          url="/images/signup_icon.svg"
          handleClick={MoveChat}
        />
        <BtnBox
          text="주문 내역"
          url="/images/signup_icon.svg"
          handleClick={MoveChat}
        />
      </div>
    </div>
  );
};

export default HomeMenus;
