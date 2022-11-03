import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogout } from '../../store/features/user';
import Btn from '../../components/atoms/buttons/btn/btn';
import HomeHeader from '../../components/atoms/headers/homeHeader/home_header';
import HomeMainBtns from '../../components/molecules/homeMainBtns/home_main_btns';
import HomeMenus from '../../components/molecules/homeMenus/home_menus';
import Footer from '../../components/atoms/footer/footer';
import { ClearStore } from '../../services/store';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin, userNickname } = useSelector((state) => state.user);

  // 현재 개발중인 페이지 이동
  const MoveLogin = () => navigate('/login');
  const MovePay = () => navigate('/order/payment');
  const MoveCheck = () => navigate('/order/confirm');
  const MoveWaitins = () => navigate('/order/waitings');

  const Logout = () => {
    dispatch(LocalLogout());
    ClearStore();

    // 페이지 다 구현 후, 제거.
    // 현재는 어쩔 수 없이 수동으로 한 번 더 이동해야 함.
    // (useEffect가 없어서 isLogin의 변화를 감지 못 함..)
    navigate('/login');
  };

  // 페이지 다 구현 후, 추가
  // useEffect(() => {
  //   if (!isLogin) navigate('/login');
  // }, [isLogin, navigate]);

  return (
    <div className="col-sm-4 home">
      <HomeHeader />

      <HomeMainBtns />

      <HomeMenus />

      {isLogin && (
        <React.Fragment>
          <h3>{userNickname}님 환영합니다.</h3>
          <Btn type="button" color="" text="로그아웃" handleClick={Logout} />
        </React.Fragment>
      )}
      {!isLogin && <h3>로그인을 해주세요</h3>}

      <Btn type="button" color="red" text="로그인" handleClick={MoveLogin} />

      <Btn type="button" color="red" text="결제 페이지" handleClick={MovePay} />

      <Btn
        type="button"
        color="blue"
        text="결제 확인 페이지"
        handleClick={MoveCheck}
      />

      <Btn
        type="button"
        color="blue"
        text="기다리는 주문 페이지"
        handleClick={MoveWaitins}
      />

      <Footer />
    </div>
  );
};
export default Home;
