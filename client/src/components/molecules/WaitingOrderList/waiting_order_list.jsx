import React from 'react';
import PickingCard from '../../atoms/cards/pickingCard/picking_card';

const WaitingOrderList = ({ myOrderList, MoveDesc }) => (
  <section className="waiting-order-list-section">
    <ul>
      {myOrderList.map((el) => (
        <PickingCard key={el.orderSequence} info={el} MoveDesc={MoveDesc} />
      ))}
    </ul>
  </section>
);

export default WaitingOrderList;
