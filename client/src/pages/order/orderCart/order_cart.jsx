/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../components/atoms/buttons/btn/btn';
import OrderingCard from '../../../components/atoms/cards/orderingCard/ordering_card';
import EmptyState from '../../../components/atoms/emptyState/empty_state';
import Header from '../../../components/atoms/headers/header/header';
import useMove from '../../../hooks/useMove';
import { RemoveItem, UpdateCart } from '../../../store/features/cart';
import { PrintPrice } from '../../../utils/text';

const OrderCart = () => {
  const dispatch = useDispatch();
  const { HandleMove, MoveBack } = useMove();

  const MovePay = useCallback(() => HandleMove('/order/payment'), [HandleMove]);

  const { cartStoreName, cartList, totalPrice } = useSelector(
    (state) => state.cart,
  );

  // 장바구니 업데이트 직접 구현 => 장바구니 업데이트 액션 함수 호출로 변경.
  const UpdateMenu = useCallback(
    (coffeeId, cnt) => {
      dispatch(UpdateCart({ coffeeId, cnt }));
    },
    [dispatch],
  );

  const DeleteMenu = useCallback(
    (coffeeId) => {
      dispatch(RemoveItem({ coffeeId }));
    },
    [dispatch],
  );

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
