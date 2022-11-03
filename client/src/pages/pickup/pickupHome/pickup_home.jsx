import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithLogo from '../../../components/atoms/headers/headerWithLogo/header_with_logo';
import PickupStoreList from '../../../components/molecules/pickupStoreList/pickup_store_list';

const PickupHome = () => {
  const navigate = useNavigate();

  const { userNickname } = useSelector((state) => state.user);
  const { stores } = useSelector((state) => state.pickup);

  const MoveHome = () => navigate('/');
  const MoveCart = () => navigate('/order/cart');

  return (
    <div className="col-sm-4 pickup-home">
      <HeaderWithLogo MoveBack={MoveHome} MoveCart={MoveCart} />
      <h4 className="pickup-home-nickname">{userNickname || '닉네임'}</h4>

      <PickupStoreList stores={stores} />

      <Footer />
    </div>
  );
};

export default PickupHome;
