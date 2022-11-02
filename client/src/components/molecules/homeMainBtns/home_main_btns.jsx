import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtnSqureBox from '../../atoms/btnSqureBox/btn_squre_box';

const HomeMainBtns = () => {
  const navigate = useNavigate();

  const MoveOrder = () => navigate('/order');
  const MovePickup = () => navigate('/pickup');

  return (
    <div className="home-main-btns">
      <BtnSqureBox handleClick={MoveOrder} text="주문하기" icon="order" />
      <BtnSqureBox handleClick={MovePickup} text="픽업하기" icon="pickup" />
    </div>
  );
};

export default HomeMainBtns;
