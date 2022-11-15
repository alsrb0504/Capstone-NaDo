import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import WaitingOrderList from '../../../components/molecules/WaitingOrderList/waiting_order_list';

const OrderWaitings = () => {
  const navigate = useNavigate();

  const { myOrderList } = useSelector((state) => state.order);

  const MoveBack = () => navigate('/');
  const MoveDesc = (id) => navigate(`/order/detail?id=${id}`);

  return (
    <div className="col-sm-4 order-waitings">
      <Header title="내가 기다리는 주문" handleClick={MoveBack} />
      <WaitingOrderList myOrderList={myOrderList} MoveDesc={MoveDesc} />
    </div>
  );
};

export default OrderWaitings;
