import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import PickingOrderList from '../../../components/molecules/pickingOrderList/picking_order_list';

const PickupMyPickup = () => {
  const navigate = useNavigate();

  const { myPickupList } = useSelector((state) => state.pickup);

  const MoveBack = () => navigate('/');

  return (
    <div className="col-sm-4 pickup-my-pickup">
      <Header title="내가 픽업한 주문" handleClick={MoveBack} />
      <PickingOrderList pickups={myPickupList} />
    </div>
  );
};

export default PickupMyPickup;
