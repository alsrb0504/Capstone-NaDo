import React from 'react';
import PickingCard from '../../atoms/cards/pickingCard/picking_card';

const PickingOrderList = ({ pickups, MoveDesc }) => (
  <section className="picking-order-list">
    <ul>
      {pickups.map((el) => (
        <PickingCard key={el.sequence} info={el} MoveDesc={MoveDesc} />
      ))}
    </ul>
  </section>
);

export default PickingOrderList;
