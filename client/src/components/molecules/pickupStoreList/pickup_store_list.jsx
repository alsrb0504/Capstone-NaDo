import React from 'react';
import PickupStoreCard from '../../atoms/cards/pickupStoreCard/pickup_store_card';

function IsSame(prev, next) {
  if (prev.stores.length !== next.stores.length) return false;

  const prevList = prev.stores;
  const nextList = next.stores;

  for (let i = 0; i < prevList.length; i += 1) {
    if (prevList.sequence !== nextList.sequence) return false;
    if (prevList.name !== nextList.name) return false;
    if (prevList.image !== nextList.image) return false;
  }

  return true;
}

const PickupStoreList = React.memo(
  ({ stores, SelectStore }) => (
    <section className="pickup-store-list">
      <ul className="pickup-store-list-container">
        {stores.map((store) => (
          <PickupStoreCard
            key={store.sequence}
            info={store}
            HandleClick={SelectStore}
          />
        ))}
      </ul>
    </section>
  ),
  IsSame,
);

export default PickupStoreList;
