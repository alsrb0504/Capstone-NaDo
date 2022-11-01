import React from 'react';
import PickingCard from '../../atoms/pickingCard/picking_card';

const WaitingOrderList = () => {
  const orders = [
    {
      address: '소프트웨어관 313호',
      request_time: '13:35',
      price: '8,900',
      picker: '피커1',
      id: 123,
    },
    {
      address: '소프트웨어관 313호',
      request_time: '13:35',
      price: '8,900',
      picker: '피커1',
      id: 234,
    },
  ];

  return (
    <section className="waiting-order-list-section">
      <ul>
        {orders.map((el) => (
          <PickingCard key={el.id} info={el} />
        ))}
      </ul>
    </section>
  );
};

export default WaitingOrderList;
