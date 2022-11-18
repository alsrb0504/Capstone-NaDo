import React from 'react';
import PickingCard from '../../atoms/cards/pickingCard/picking_card';

const PickingOrderList = ({ pickups, MoveDesc }) => (
  <section className="picking-order-list">
    <ul>
      {pickups.map((el) => (
        <PickingCard key={el.pickupSequence} info={el} MoveDesc={MoveDesc} />
      ))}
    </ul>
  </section>
);

export default PickingOrderList;
