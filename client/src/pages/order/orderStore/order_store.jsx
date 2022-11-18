/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithImg from '../../../components/atoms/headers/headerWithImg/header_with_img';
import StoreInfoSection from '../../../components/atoms/storeInfoSection/store_info_section';
import StoreMapSection from '../../../components/molecules/storeMapSection/store_map_section';
import StoreMenuSection from '../../../components/molecules/storeMenuSection/store_menu_section';

const OrderStore = () => {
  const navigate = useNavigate();

  const { selectedStore, defaultMenuList } = useSelector(
    (state) => state.order,
  );

  const {
    // sequence,
    name,
    storeImage,
    locationLating,
    telephone,
    businesstimes,
    menus,
  } = selectedStore;

  const MoveBack = () => navigate('/order');
  const MoveCart = () => navigate('/order/cart');

  const CheckMenuList = () => {
    if (menus && menus.length !== 0) return menus;
    return defaultMenuList;
  };

  return (
    <div className="col-sm-4 order-store">
      <HeaderWithImg
        shopImg={storeImage || '/images/cafeImg/default_cafe_img.jpg'}
        MoveBack={MoveBack}
        MoveCart={MoveCart}
      />

      <StoreInfoSection
        shopName={name}
        shopOpenTime={businesstimes}
        shopNumber={telephone}
      />

      <StoreMapSection locationLatLong={locationLating} isTitle={true} />

      <StoreMenuSection menuList={CheckMenuList()} />

      <Footer />
    </div>
  );
};

export default OrderStore;
