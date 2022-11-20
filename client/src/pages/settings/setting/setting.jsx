import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BtnProfile from '../../../components/atoms/buttons/btnProfile/btn_profile';
import Footer from '../../../components/atoms/footer/footer';
import Header from '../../../components/atoms/headers/header/header';
import ProfileCard from '../../../components/atoms/cards/profileCard/profile_card';
import { LocalLogout } from '../../../store/features/user';
import { ClearStore } from '../../../utils/store';
import { SwalError } from '../../../utils/swal';

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 추후 프로필도 가져와서 업데이트
  const { userNickname, userProvider, userProfile } = useSelector(
    (state) => state.user,
  );

  const MoveHome = () => navigate('/');
  const MoveEditProfile = () => navigate('/setting/profile');
  const MoveRecord = () => navigate('/setting/order_history');
  const MoveProfit = () => navigate('/setting/income_calculate');

  const MoveEditPassword = () => {
    if (userProvider !== 'local') {
      SwalError('로컬 계정만 이용 가능합니다.', 1200);
      return;
    }

    navigate('/setting/passwd');
  };

  const Logout = () => {
    dispatch(LocalLogout());

    setTimeout(() => {
      ClearStore();
      navigate('/login');
      // window.location.reload();
    }, 200);
  };

  // 추후 회원탈퇴 구현
  const UnRegister = () => {
    alert('회원 탈퇴 미구현');
  };

  return (
    <div className="setting col-sm-4">
      <Header title="설정" handleClick={MoveHome} />

      {/* url 나중에 프로필 정보 받아오는 걸로 교체 */}
      <ProfileCard
        url={
          userProfile ||
          'https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151_960_720.jpg'
        }
        nickname={userNickname}
      />

      <section className="setting-menu">
        <div className="setting-menu-title">개인정보</div>
        <BtnProfile text="프로필 수정" handleClick={MoveEditProfile} />
        <BtnProfile text="비밀번호 변경" handleClick={MoveEditPassword} />
        <BtnProfile text="로그아웃" handleClick={Logout} />
        <BtnProfile text="회원 탈퇴" handleClick={UnRegister} />
      </section>

      <section className="setting-menu setting-menu-last">
        <div className="setting-menu-title">사용 내역</div>
        <BtnProfile text="주문 내역" handleClick={MoveRecord} />
        <BtnProfile text="픽업 내역" handleClick={MoveProfit} />
      </section>

      <Footer />
    </div>
  );
};

export default Setting;
