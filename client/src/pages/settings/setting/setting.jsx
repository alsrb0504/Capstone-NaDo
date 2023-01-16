import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnProfile from '../../../components/atoms/buttons/btnProfile/btn_profile';
import Footer from '../../../components/atoms/footer/footer';
import Header from '../../../components/atoms/headers/header/header';
import ProfileCard from '../../../components/atoms/cards/profileCard/profile_card';
import { LocalLogout } from '../../../store/features/user';
import { ClearStore } from '../../../utils/store';
import { SwalError } from '../../../utils/swal';
import useMove from '../../../hooks/useMove';

const Setting = () => {
  const { HandleMove, MoveHome } = useMove();
  const dispatch = useDispatch();

  const { userNickname, userProvider, userProfile } = useSelector(
    (state) => state.user,
  );

  const MoveEditProfile = useCallback(
    () => HandleMove('/setting/profile'),
    [HandleMove],
  );
  const MoveRecord = useCallback(
    () => HandleMove('/setting/order_history'),
    [HandleMove],
  );
  const MoveProfit = useCallback(
    () => HandleMove('/setting/income_calculate'),
    [HandleMove],
  );

  const MoveEditPassword = useCallback(() => {
    if (userProvider !== 'local') {
      SwalError('로컬 계정만 이용 가능합니다.', 1200);
      return;
    }

    HandleMove('/setting/passwd');
  }, [userProvider, HandleMove]);

  const Logout = useCallback(() => {
    dispatch(LocalLogout());

    setTimeout(() => {
      ClearStore();
      HandleMove('/login');
      window.location.reload();
    }, 200);
  }, [dispatch, HandleMove]);

  const UnRegister = useCallback(() => {
    alert('회원 탈퇴');
    // 미구현...
  }, []);

  return (
    <div className="setting col-sm-4">
      <Header title="설정" HandleClick={MoveHome} />

      <ProfileCard
        url={
          userProfile ||
          'https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151_960_720.jpg'
        }
        nickname={userNickname}
      />

      <section className="setting-menu">
        <div className="setting-menu-title">개인정보</div>
        <BtnProfile text="프로필 수정" HandleClick={MoveEditProfile} />
        <BtnProfile text="비밀번호 변경" HandleClick={MoveEditPassword} />
        <BtnProfile text="로그아웃" HandleClick={Logout} />
        <BtnProfile text="회원 탈퇴" HandleClick={UnRegister} />
      </section>

      <section className="setting-menu setting-menu-last">
        <div className="setting-menu-title">사용 내역</div>
        <BtnProfile text="주문 내역" HandleClick={MoveRecord} />
        <BtnProfile text="픽업 내역" HandleClick={MoveProfit} />
      </section>

      <Footer />
    </div>
  );
};

export default Setting;
