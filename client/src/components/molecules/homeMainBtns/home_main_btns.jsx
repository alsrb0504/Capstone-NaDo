import React from 'react';
import BtnSqureBox from '../../atoms/buttons/btnSqureBox/btn_squre_box';

const HomeMainBtns = React.memo(({ MoveOrder, MovePickup }) => (
  <div className="home-main-btns">
    <BtnSqureBox HandleClick={MoveOrder} text="주문하기" icon="order" />
    <BtnSqureBox HandleClick={MovePickup} text="픽업하기" icon="pickup" />
  </div>
));

export default HomeMainBtns;
