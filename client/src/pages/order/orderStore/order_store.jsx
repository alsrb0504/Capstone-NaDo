/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithImg from '../../../components/atoms/headerWithImg/header_with_img';
import StoreInfoSection from '../../../components/atoms/storeInfoSection/store_info_section';
import StoreMapSection from '../../../components/molecules/storeMapSection/store_map_section';
import StoreMenuSection from '../../../components/molecules/storeMenuSection/store_menu_section';

const OrderStore = () => {
  const navigate = useNavigate();

  const { selectedStore } = useSelector((state) => state.order);

  const {
    shopName,
    shopImg,
    locationLatLong,
    shopContactNumber,
    shopOpenTime,
    menuLists,
  } = selectedStore;

  const MoveBack = () => navigate('/order');
  const MoveCart = () => navigate('/order/cart');

  return (
    <div className="col-sm-4 order-store">
      <HeaderWithImg bg={shopImg} MoveBack={MoveBack} MoveCart={MoveCart} />

      <StoreInfoSection
        shopName={shopName}
        shopOpenTime={shopOpenTime}
        shopNumber={shopContactNumber}
      />

      <StoreMapSection locationLatLong={locationLatLong} />

      <StoreMenuSection menuLists={menuLists} />

      <Footer />
    </div>
  );
};

export default OrderStore;
