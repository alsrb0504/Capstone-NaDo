import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogout } from '../../store/features/user';
import Btn from '../../components/atoms/btn/btn';
import HomeHeader from '../../components/molecules/homeHeader/home_header';
import HomeMainBtns from '../../components/molecules/homeMainBtns/home_main_btns';
import HomeMenus from '../../components/molecules/homeMenus/home_menus';
import Footer from '../../components/atoms/footer/footer';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin, userNickname } = useSelector((state) => state.user);

  const MoveTest = () => {
    navigate('/test/login');
  };

  const MoveLogin = () => {
    navigate('/login');
  };

  const Logout = () => {
    dispatch(LocalLogout());
  };

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

      <Btn
        type="button"
        color="red"
        text="테스트 로그인 페이지"
        handleClick={MoveTest}
      />

      <Btn
        type="button"
        color="blue"
        text="로그인 페이지"
        handleClick={MoveLogin}
      />

      <Footer />
    </div>
  );
};
export default Home;
