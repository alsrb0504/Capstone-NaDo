import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/header/header';
import PaymentForm from '../../../components/molecules/paymentForm/payment_form';

const OrderPayment = () => {
  const navigate = useNavigate();

  // 추후 장바구니로 갈지, 가게로 갈지 구분
  const MoveBack = () => navigate('/order/store');

  return (
    <div className="col-sm-4 order-payment">
      <Header title="결제" handleClick={MoveBack} />
      <PaymentForm />
    </div>
  );
};

export default OrderPayment;
