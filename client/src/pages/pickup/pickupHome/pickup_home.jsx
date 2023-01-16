import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithLogo from '../../../components/atoms/headers/headerWithLogo/header_with_logo';
import PickupStoreList from '../../../components/molecules/pickupStoreList/pickup_store_list';
import useMove from '../../../hooks/useMove';
import {
  GetPickupStoreDetail,
  GetPickupStoreList,
} from '../../../store/features/pickup';

const PickupHome = () => {
  const dispatch = useDispatch();
  const { HandleMove, MoveHome } = useMove();

  const MoveCart = useCallback(() => HandleMove('/order/cart'), [HandleMove]);

  const { userNickname } = useSelector((state) => state.user);
  const { storeList } = useSelector((state) => state.pickup);

  const SelectStore = (storeId) => {
    dispatch(GetPickupStoreDetail(storeId));
    HandleMove('/pickup/store');
  };

  useEffect(() => {
    dispatch(GetPickupStoreList());
  }, [dispatch]);

  return (
    <div className="col-sm-4 pickup-home">
      <HeaderWithLogo MoveBack={MoveHome} MoveCart={MoveCart} />
      <h4 className="pickup-home-nickname">{userNickname || '닉네임'}</h4>

      <PickupStoreList stores={storeList} SelectStore={SelectStore} />

      <Footer />
    </div>
  );
};

export default PickupHome;
