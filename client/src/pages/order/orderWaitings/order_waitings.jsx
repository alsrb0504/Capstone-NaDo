import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import WaitingOrderList from '../../../components/molecules/WaitingOrderList/waiting_order_list';
import { GetOrderDetail } from '../../../store/features/order';

const OrderWaitings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myOrderList } = useSelector((state) => state.order);

  const MoveBack = () => navigate('/');
  const MoveDesc = (id) => {
    dispatch(GetOrderDetail(id));

    navigate(`/order/detail?id=${id}`);
  };

  return (
    <div className="col-sm-4 order-waitings">
      <Header title="내가 기다리는 주문" handleClick={MoveBack} />
      <WaitingOrderList myOrderList={myOrderList} MoveDesc={MoveDesc} />
    </div>
  );
};

export default OrderWaitings;
