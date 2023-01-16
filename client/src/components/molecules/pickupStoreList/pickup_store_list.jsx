import React from 'react';
import PickupStoreCard from '../../atoms/cards/pickupStoreCard/pickup_store_card';

const PickupStoreList = ({ stores, SelectStore }) => (
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
);

export default PickupStoreList;
