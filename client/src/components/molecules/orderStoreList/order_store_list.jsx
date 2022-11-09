import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetStoreDetail } from '../../../store/features/order';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

const OrderStoreList = ({ storeList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SelectCard = (storeSequence) => {
    dispatch(GetStoreDetail(storeSequence));
    navigate('/order/store');
  };

  return (
    <ul className="order-store-list-container">
      {storeList &&
        storeList.map((store) => (
          <OrderStoreCard
            key={store.sequence}
            info={store}
            handleClick={SelectCard}
          />
        ))}
    </ul>
  );
};

export default OrderStoreList;
