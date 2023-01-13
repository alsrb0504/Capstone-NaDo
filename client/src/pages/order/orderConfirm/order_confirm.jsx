import React from 'react';
import Btn from '../../../components/atoms/buttons/btn/btn';
import Header from '../../../components/atoms/headers/header/header';
import PaymentConfirm from '../../../components/molecules/paymentConfirm/payment_confirm';
import useMove from '../../../hooks/useMove';

const OrderConfirm = () => {
  const { HandleMove } = useMove();

  const MoveBack = () => HandleMove('/order/store');

  return (
    <div className="col-sm-4 order-confirm">
      <Header title="결제 확인" handleClick={MoveBack} />
      <PaymentConfirm />
      <Btn text="확인" />
    </div>
  );
};

export default OrderConfirm;
