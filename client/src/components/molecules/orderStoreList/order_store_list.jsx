import React from 'react';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

const OrderStoreList = ({ storeList, SelectStore }) => (
  <ul className="order-store-list-container">
    {storeList &&
      storeList.map((store) => (
        <OrderStoreCard
          key={store.sequence}
          info={store}
          HandleClick={SelectStore}
        />
      ))}
  </ul>
);

export default OrderStoreList;
