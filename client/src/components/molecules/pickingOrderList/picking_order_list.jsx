import React from 'react';
import PickingCard from '../../atoms/cards/pickingCard/picking_card';

const PickingOrderList = ({ pickups }) => (
  <section className="picking-order-list">
    <ul>
      {pickups.map((el) => (
        <PickingCard key={el.id} info={el} />
      ))}
    </ul>
  </section>
);

export default PickingOrderList;
