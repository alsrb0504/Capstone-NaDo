import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/atoms/headers/header/header';
import PickingOrderList from '../../../components/molecules/pickingOrderList/picking_order_list';
import useMove from '../../../hooks/useMove';
import { GetCurrentPickupDetail } from '../../../store/features/pickup';

const PickupMyPickup = () => {
  const dispatch = useDispatch();
  const { HandleMove, MoveBack } = useMove();

  const { myPickupList } = useSelector((state) => state.pickup);

  const MoveDesc = useCallback(
    (orderId) => {
      dispatch(GetCurrentPickupDetail(orderId));
      HandleMove(`/pickup/processing?sequence=${orderId}`);
    },
    [dispatch, HandleMove],
  );

  return (
    <div className="col-sm-4 pickup-my-pickup">
      <Header title="내가 픽업한 주문" HandleClick={MoveBack} />
      <PickingOrderList pickups={myPickupList} MoveDesc={MoveDesc} />
    </div>
  );
};

export default PickupMyPickup;
