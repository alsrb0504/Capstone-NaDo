import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/header/header';
import WaitingOrderList from '../../../components/molecules/WaitingOrderList/waiting_order_list';

const OrderWaitings = () => {
  const navigate = useNavigate();

  const MoveBack = navigate('/');

  return (
    <div className="col-sm-4 order-waitings">
      <Header title="내가 기다리는 주문" handleClick={MoveBack} />
      <WaitingOrderList />
    </div>
  );
};

export default OrderWaitings;
