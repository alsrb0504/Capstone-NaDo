import React from 'react';
import PickupStoreCard from '../../atoms/cards/pickupStoreCard/pickup_store_card';

const PickupStoreList = ({ stores }) => {
  const SelectCard = () => {};

  return (
    <section className="pickup-store-list">
      <ul className="pickup-store-list-container">
        {stores.map((store) => (
          <PickupStoreCard
            key={store.sequence}
            info={store}
            handleClick={SelectCard}
          />
        ))}
      </ul>
    </section>
  );
};

export default PickupStoreList;
