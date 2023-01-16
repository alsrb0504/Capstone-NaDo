/* eslint-disable react/jsx-boolean-value */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderWithImg from '../../../components/atoms/headers/headerWithImg/header_with_img';
import StoreInfoSection from '../../../components/atoms/storeInfoSection/store_info_section';
import StoreMapSection from '../../../components/molecules/storeMapSection/store_map_section';
import StorePickupList from '../../../components/molecules/storePickupList/store_pickup_list';
import useMove from '../../../hooks/useMove';
import { GetPickupDetail } from '../../../store/features/pickup';

const PickupStore = () => {
  const dispatch = useDispatch();
  const { HandleMove, MoveBack } = useMove();

  const MoveCart = useCallback(() => HandleMove('/order/cart'), [HandleMove]);

  const { selectedStore } = useSelector((state) => state.pickup);
  const {
    storeImage,
    name,
    telephone,
    businesstimes,
    locationLating,
    pickupList,
  } = selectedStore;

  const SelectPickup = useCallback(
    (orderId) => {
      dispatch(GetPickupDetail(orderId));
      HandleMove(`/pickup/detail?sequence=${orderId}`);
    },
    [dispatch, HandleMove],
  );

  return (
    <div className="col-sm-4 pickup-store">
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

      <StorePickupList pickupList={pickupList} SelectPickup={SelectPickup} />
    </div>
  );
};

export default PickupStore;
