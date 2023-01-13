import React from 'react';
import BtnSqureBox from '../../atoms/buttons/btnSqureBox/btn_squre_box';

const HomeMainBtns = ({ MoveOrder, MovePickup }) => (
  <div className="home-main-btns">
    <BtnSqureBox handleClick={MoveOrder} text="주문하기" icon="order" />
    <BtnSqureBox handleClick={MovePickup} text="픽업하기" icon="pickup" />
  </div>
);

export default HomeMainBtns;
