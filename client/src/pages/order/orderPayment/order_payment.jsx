/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import PaymentForm from '../../../components/molecules/paymentForm/payment_form';
import { RequestPayment } from '../../../store/features/order';

const OrderPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartStoreSequence, cartList, totalPrice } = useSelector(
    (state) => state.cart,
  );

  // 추후 장바구니로 갈지, 가게로 갈지 구분
  const MoveBack = () => navigate('/order/cart');

  const SubmitPayment = (data) => {
    dispatch(
      RequestPayment({
        ...data,
        storeSequence: cartStoreSequence,
        cartList,
        cartTotalPrice: totalPrice,
      }),
    );
  };

  return (
    <div className="col-sm-4 order-payment">
      <Header title="결제" handleClick={MoveBack} />
      <PaymentForm SubmitPayment={SubmitPayment} />
    </div>
  );
};

export default OrderPayment;
