import React from 'react';
import PickupReadyCard from '../../atoms/cards/pickupReadyCard/pickup_ready_card';

const StorePickupList = ({ pickupList, MoveDetail }) => (
  <section className="pickup-list">
    <h3 className="pickup-list-title">주문 현황</h3>
    <ul className="pickup-list-container">
      {pickupList.map((item) => (
        <PickupReadyCard
          key={item.pickupId}
          info={item}
          handleClick={MoveDetail}
        />
      ))}
    </ul>
  </section>
);

export default StorePickupList;
