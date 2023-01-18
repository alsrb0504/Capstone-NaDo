import React from 'react';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

function IsSame(prev, next) {
  // eslint-disable-next-line consistent-return
  Object.keys(prev).forEach((el) => {
    console.log(prev[el]);
    console.log(next[el]);

    if (prev[el] !== next[el]) return false;
  });

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
