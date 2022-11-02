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

  const { selectedStore, defaultMenuLists } = useSelector(
    (state) => state.order,
  );

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

  const CheckMenuList = () => {
    if (Object.keys(menuLists).length !== 0) return menuLists;
    return defaultMenuLists;
  };

  return (
    <div className="col-sm-4 order-store">
      <HeaderWithImg
        shopImg={shopImg || '/images/cafeImg/default_cafe_img.jpg'}
        MoveBack={MoveBack}
        MoveCart={MoveCart}
      />

      <StoreInfoSection
        shopName={shopName}
        shopOpenTime={shopOpenTime}
        shopNumber={shopContactNumber}
      />

      <StoreMapSection locationLatLong={locationLatLong} isTitle={true} />

      <StoreMenuSection menuLists={CheckMenuList()} />

      <Footer />
    </div>
  );
};

export default OrderStore;
