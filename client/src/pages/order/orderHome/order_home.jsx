import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithLogo from '../../../components/atoms/headers/headerWithLogo/header_with_logo';
import OrderStoreList from '../../../components/molecules/orderStoreList/order_store_list';
import { GetStoreList } from '../../../store/features/order';

const OrderHome = () => {
  const navigate = useNavigate();

  const { userNickname } = useSelector((state) => state.user);
  const { storeList } = useSelector((state) => state.order);

  const MoveHome = () => navigate('/');
  const MoveCart = () => navigate('/order/cart');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetStoreList());
  }, [dispatch]);

  return (
    <div className="col-sm-4 order-home">
      <HeaderWithLogo MoveBack={MoveHome} MoveCart={MoveCart} />
      <h4 className="order-home-nickname">{userNickname || '닉네임'}</h4>

      <OrderStoreList storeList={storeList} />

      <Footer />
    </div>
  );
};

export default OrderHome;
