import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../components/atoms/buttons/btn/btn';
import HomeHeader from '../../components/atoms/headers/homeHeader/home_header';
import HomeMainBtns from '../../components/molecules/homeMainBtns/home_main_btns';
import HomeMenus from '../../components/molecules/homeMenus/home_menus';
import Footer from '../../components/atoms/footer/footer';
import { GetOrderList } from '../../store/features/order';
import { GetMyPickList } from '../../store/features/pickup';
import useMove from '../../hooks/useMove';

const Home = () => {
  const { HandleMove } = useMove();
  const dispatch = useDispatch();

  const MoveOrderWaiting = useCallback(
    () => HandleMove('/order/waitings'),
    [HandleMove],
  );
  const MovePickupList = useCallback(
    () => HandleMove('/pickup/mypickup'),
    [HandleMove],
  );
  const MoveOrder = useCallback(() => HandleMove('/order'), [HandleMove]);
  const MovePickup = useCallback(() => HandleMove('/pickup'), [HandleMove]);
  const MoveSetting = useCallback(() => HandleMove('/setting'), [HandleMove]);

  const isLogin = useSelector((state) => state.user.isLogin);
  const isCatch = useSelector((state) => state.pickup.isCatch);
  const myOrderList = useSelector((state) => state.order.myOrderList);

  useEffect(() => {
    if (!isLogin) HandleMove('/login');

    dispatch(GetOrderList());
    dispatch(GetMyPickList());
  }, [isLogin, dispatch, HandleMove]);

  return (
    <div className="col-sm-4 home">
      <HomeHeader MoveSetting={MoveSetting} />

      <HomeMainBtns MoveOrder={MoveOrder} MovePickup={MovePickup} />

      {myOrderList.length > 0 && (
        <div className="home-order-btn">
          <Btn
            tupe="buton"
            color="gradation"
            text="내가 기다리는 주문"
            HandleClick={MoveOrderWaiting}
          />
        </div>
      )}
      {isCatch && (
        <div className="home-order-btn">
          <Btn
            tupe="buton"
            color="gradation"
            text="내가 픽업한 주문"
            HandleClick={MovePickupList}
          />
        </div>
      )}

      <HomeMenus />

      <Footer />
    </div>
  );
};
export default Home;
