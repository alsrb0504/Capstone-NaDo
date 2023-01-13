import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithLogo from '../../../components/atoms/headers/headerWithLogo/header_with_logo';
import OrderStoreList from '../../../components/molecules/orderStoreList/order_store_list';
import useMove from '../../../hooks/useMove';
import { GetStoreDetail, GetStoreList } from '../../../store/features/order';

const OrderHome = () => {
  const dispatch = useDispatch();

  const { HandleMove, MoveHome } = useMove(); // 커스텀 훅 : 확인용 콘솔 찍음.

  const MoveCart = () => HandleMove('/order/cart');

  // 가게 선택 함수.
  const SelectStore = useCallback(
    (storeSequence) => {
      dispatch(GetStoreDetail(storeSequence));
      HandleMove('/order/store');
    },
    [dispatch, HandleMove],
  );

  const { userNickname } = useSelector((state) => state.user);
  const { storeList } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(GetStoreList());
  }, [dispatch]);

  return (
    <div className="col-sm-4 order-home">
      <HeaderWithLogo MoveBack={MoveHome} MoveCart={MoveCart} />
      <h4 className="order-home-nickname">{userNickname || '닉네임'}</h4>

      <OrderStoreList storeList={storeList} SelectStore={SelectStore} />

      <Footer />
    </div>
  );
};

export default OrderHome;
