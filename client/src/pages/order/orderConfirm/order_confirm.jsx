import React from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../../components/atoms/btn/btn';
import Header from '../../../components/atoms/header/header';
import PaymentConfirm from '../../../components/molecules/paymentConfirm/payment_confirm';

// eslint-disable-next-line arrow-body-style
const OrderConfirm = () => {
  const navigate = useNavigate();

  const MoveBack = () => navigate('/order/store');

  return (
    <div className="col-sm-4 order-confirm">
      <Header title="결제 확인" handleClick={MoveBack} />
      <PaymentConfirm />
      <Btn text="확인" />
    </div>
  );
};

export default OrderConfirm;
