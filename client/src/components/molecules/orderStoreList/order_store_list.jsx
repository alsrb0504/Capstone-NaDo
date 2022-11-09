/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectStore } from '../../../store/features/order';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

const OrderStoreList = ({ storeList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SelectCard = (storeName) => {
    dispatch(SelectStore(storeName));
    navigate('/order/store');
  };

  return (
    <ul className="order-store-list-container">
      {/* 가게 아이템들 */}

      {storeList.map((store) => (
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
