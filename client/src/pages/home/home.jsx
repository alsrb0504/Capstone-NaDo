import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogout } from '../../store/features/user';
import Btn from '../../components/atoms/buttons/btn/btn';
import HomeHeader from '../../components/atoms/headers/homeHeader/home_header';
import HomeMainBtns from '../../components/molecules/homeMainBtns/home_main_btns';
import HomeMenus from '../../components/molecules/homeMenus/home_menus';
import Footer from '../../components/atoms/footer/footer';
import { ClearStore } from '../../utils/store';
import { GetOrderList } from '../../store/features/order';
import { GetMyPickList } from '../../store/features/pickup';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin, userNickname } = useSelector((state) => state.user);
  const { myOrderList } = useSelector((state) => state.order);
  const { isCatch } = useSelector((state) => state.pickup);

  const MoveOrderWaiting = () => navigate('/order/waitings');
  const MovePickupList = () => navigate('/pickup/mypickup');

  const Logout = () => {
    dispatch(LocalLogout());

    setTimeout(() => {
      ClearStore();
      window.location.reload();
    }, 200);
  };

  useEffect(() => {
    if (!isLogin) navigate('/login');
    dispatch(GetOrderList());
    dispatch(GetMyPickList());
  }, [isLogin, dispatch, navigate]);

  return (
    <div className="col-sm-4 home">
      <HomeHeader />

      <HomeMainBtns />

      {myOrderList.length > 0 && (
        <div className="home-order-btn">
          <Btn
            tupe="buton"
            color="gradation"
            text="내가 기다리는 주문"
            handleClick={MoveOrderWaiting}
          />
        </div>
      )}
      {isCatch && (
        <div className="home-order-btn">
          <Btn
            tupe="buton"
            color="gradation"
            text="내가 픽업한 주문"
            handleClick={MovePickupList}
          />
        </div>
      )}

      <HomeMenus />

      {isLogin && (
        <React.Fragment>
          <h3>{userNickname}님 환영합니다.</h3>
          <Btn type="button" color="" text="로그아웃" handleClick={Logout} />
        </React.Fragment>
      )}
      {!isLogin && <h3>로그인을 해주세요</h3>}

      <Footer />
    </div>
  );
};
export default Home;
