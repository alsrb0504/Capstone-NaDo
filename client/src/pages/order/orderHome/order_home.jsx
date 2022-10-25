import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithLogo from '../../../components/atoms/headerWithLogo/header_with_logo';
import OrderStoreList from '../../../components/molecules/orderStoreList/order_store_list';

const OrderHome = () => {
  const navigate = useNavigate();

  const { userNickname } = useSelector((state) => state.user);

  const MoveHome = () => navigate('/');

  return (
    <div className="col-sm-4 order-home">
      <HeaderWithLogo MoveBack={MoveHome} />
      <h4 className="order-home-nickname">{userNickname || '닉네임'}</h4>

      <OrderStoreList />

      <Footer />
    </div>
  );
};

export default OrderHome;
