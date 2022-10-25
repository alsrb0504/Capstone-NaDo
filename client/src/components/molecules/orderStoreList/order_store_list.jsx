import React from 'react';
import { useSelector } from 'react-redux';
import OrderStoreCard from '../../atoms/orderStoreCard/order_store_card';

const OrderStoreList = () => {
  const { stores } = useSelector((state) => state.order);

  const MakeStoreInfo = (store) => {
    const info = {
      name: store.shopName,
      // 추후 가게 이미지 존재하는 거 확인하는 과정 필요
      url: 'images/default_cafe_img.jpg',
      // 가게 시간 계산 부분 추후 구현
      isOpen: true,
    };

    return info;
  };

  return (
    <ul className="order-store-list-container">
      {/* 가게 아이템들 */}
      {Object.keys(stores).map((el) => (
        <OrderStoreCard
          key={stores.storeName}
          info={MakeStoreInfo(stores[el])}
        />
      ))}
    </ul>
  );
};

export default OrderStoreList;
