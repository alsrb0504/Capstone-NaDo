/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import PaymentForm from '../../../components/molecules/paymentForm/payment_form';
import { CleanCart } from '../../../store/features/cart';
import { InitIsPayment, RequestPayment } from '../../../store/features/order';
import { SwalError, SwalSuccess } from '../../../utils/swal';

const OrderPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartStoreSequence, cartList, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const { isPayment } = useSelector((state) => state.order);

  const MoveHome = () => navigate('/');
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

  useEffect(() => {
    const popupTimer = 1200;

    if (isPayment === 'success') {
      SwalSuccess('결제 완료!', popupTimer);

      // 홈으로 화면 이동
      setTimeout(() => {
        MoveHome();
        dispatch(CleanCart());
        dispatch(InitIsPayment());
      }, popupTimer);
    }

    if (isPayment === 'error') {
      SwalError('결제 실패!', popupTimer);

      // 홈으로 화면 이동
      setTimeout(() => {
        MoveHome();
        dispatch(InitIsPayment());
      }, popupTimer);
    }
  }, [isPayment, dispatch, MoveHome]);

  return (
    <div className="col-sm-4 order-payment">
      <Header title="결제" handleClick={MoveBack} />
      <PaymentForm SubmitPayment={SubmitPayment} />
    </div>
  );
};

export default OrderPayment;
