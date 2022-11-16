import React from 'react';
import PickupReadyCard from '../../atoms/cards/pickupReadyCard/pickup_ready_card';

const StorePickupList = ({ pickupList, SelectPickup }) => (
  <section className="pickup-list">
    <h3 className="pickup-list-title">주문 현황</h3>
    <ul className="pickup-list-container">
      {pickupList.map((item) => (
        <PickupReadyCard
          key={item.orderSequence}
          info={item}
          handleClick={SelectPickup}
        />
      ))}
      {/* 여기 컴포넌트 필요. */}
      {pickupList.length === 0 && <div>현재 주문이 없습니다.</div>}
    </ul>
  </section>
);

export default StorePickupList;
