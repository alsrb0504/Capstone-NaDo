/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../components/atoms/buttons/btn/btn';
import OrderingCard from '../../../components/atoms/cards/orderingCard/ordering_card';
import EmptyState from '../../../components/atoms/emptyState/empty_state';
import Header from '../../../components/atoms/headers/header/header';
import useMove from '../../../hooks/useMove';
import { UpdateCart } from '../../../store/features/cart';
import { PrintPrice } from '../../../utils/text';

const OrderCart = () => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

  const MoveBack = useCallback(() => HandleMove('/order'), [HandleMove]);
  const MovePay = useCallback(() => HandleMove('/order/payment'), [HandleMove]);

  const { cartStoreName, cartList, totalPrice } = useSelector(
    (state) => state.cart,
  );

  // 어차피 새로 만들어짐...
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
      {cartList.length === 0 && <EmptyState text="장바구니가 비었습니다." />}

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
