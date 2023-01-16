import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/atoms/headers/header/header';
import WaitingOrderList from '../../../components/molecules/WaitingOrderList/waiting_order_list';
import useMove from '../../../hooks/useMove';
import { GetOrderDetail } from '../../../store/features/order';

const OrderWaitings = () => {
  const { HandleMove, MoveBack } = useMove();
  const dispatch = useDispatch();

  const { myOrderList } = useSelector((state) => state.order);

  const MoveDesc = useCallback(
    (id) => {
      dispatch(GetOrderDetail(id));

      HandleMove(`/order/detail?id=${id}`);
    },
    [dispatch, HandleMove],
  );

  return (
    <div className="col-sm-4 order-waitings">
      <Header title="내가 기다리는 주문" handleClick={MoveBack} />
      <WaitingOrderList myOrderList={myOrderList} MoveDesc={MoveDesc} />
    </div>
  );
};

export default OrderWaitings;
