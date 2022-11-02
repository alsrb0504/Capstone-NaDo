import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectStore } from '../../../store/features/order';
import OrderStoreCard from '../../atoms/cards/orderStoreCard/order_store_card';

const OrderStoreList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stores } = useSelector((state) => state.order);

  const MakeStoreInfo = (store) => {
    const info = {
      name: store.shopName,
      url: store.shopImg || 'images/cafeImg/default_cafe_img.jpg',
      // 가게 시간 계산 부분 추후 구현
      isOpen: true,
    };

    return info;
  };

  const SelectCard = (storeName) => {
    const selectedStore = stores[storeName];
    dispatch(SelectStore(selectedStore));
    navigate('/order/store');
  };

  return (
    <ul className="order-store-list-container">
      {/* 가게 아이템들 */}
      {Object.keys(stores).map((el) => (
        <OrderStoreCard
          key={stores[el].shopName}
          info={MakeStoreInfo(stores[el])}
          handleClick={SelectCard}
        />
      ))}
    </ul>
  );
};

export default OrderStoreList;
