import React from 'react';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

function IsSame(prev, next) {
  if (prev.storeList.length !== next.storeList.length) return false;

  const prevList = prev.storeList;
  const nextList = next.storeList;

  for (let i = 0; i < prevList.length; i += 1) {
    if (prevList.sequence !== nextList.sequence) return false;
    if (prevList.name !== nextList.name) return false;
    if (prevList.image !== nextList.image) return false;
  }

  return true;
}

const OrderStoreList = React.memo(
  ({ storeList, SelectStore }) => (
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
  ),
  IsSame,
);

export default OrderStoreList;
