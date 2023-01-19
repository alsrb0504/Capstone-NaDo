/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import React from 'react';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

function IsSame(prev, next) {
  Object.keys(prev).forEach((el) => {
    if (prev[el] !== next[el]) return false;
  });

  // 가게 목록 비교
  const prevList = prev.storeList;
  const nextList = next.storeList;

  if (prevList.length !== nextList.length) return false;

  for (let i = 0; i < prevList.length; i++) {
    const { sequence, name, image } = prevList[i];

    if (sequence !== nextList[i].sequence) return false;
    if (name !== nextList[i].name) return false;
    if (image !== nextList[i].image) return false;
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
