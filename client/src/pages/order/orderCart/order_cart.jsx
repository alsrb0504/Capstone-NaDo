/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Btn from '../../../components/atoms/buttons/btn/btn';
import OrderingCard from '../../../components/atoms/cards/orderingCard/ordering_card';
import EmptyState from '../../../components/atoms/emptyState/empty_state';
import Header from '../../../components/atoms/headers/header/header';
import { UpdateCart } from '../../../store/features/cart';
import { PrintPrice } from '../../../utils/text';

const OrderCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartStoreName, cartList, totalPrice } = useSelector(
    (state) => state.cart,
  );

  // 추후 가게 화면 또는 가게 리스트 화면 중 하나로 이동하도록
  const MoveBack = () => navigate('/order');
  const MovePay = () => navigate('/order/payment');

  const UpdateMenu = (cartSequence, cartCnt) => {
    const updatedCartList = cartList.map((el) => {
      if (el.menuSequence === cartSequence)
        return {
          ...el,
          cnt: cartCnt,
          totalPrice: el.menuPrice * cartCnt,
        };

      return el;
    });

    dispatch(UpdateCart({ updatedCartList }));
  };

  const DeleteMenu = (cartSequence) => {
    const updatedCartList = cartList.filter(
      (el) => el.menuSequence !== cartSequence,
    );
    dispatch(UpdateCart({ updatedCartList }));
  };

  return (
    <div className="col-sm-4 order-cart">
      <Header title="장바구니" handleClick={MoveBack} />
      {cartList.length === 0 && (
        <EmptyState text='장바구니가 비었습니다.'/>
      )}

      {/* 장바구니 차 있을 경우, 컴포넌트 구현해야 함. */}
      {cartList.length !== 0 && (
        <div className="order-cart-fill-section">
          <h4 className="order-cart-fill-name">{cartStoreName}</h4>
          {cartList.map((item) => (
            <OrderingCard
              key={item.menuSequence}
              info={item}
              UpdateMenu={UpdateMenu}
              DeleteMenu={DeleteMenu}
            />
          ))}

          <Btn
            text={`${PrintPrice(totalPrice)}원 결제하기`}
            handleClick={MovePay}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCart;
