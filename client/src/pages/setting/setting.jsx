import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BtnProfile from '../../components/atoms/buttons/btnProfile/btn_profile';
import Footer from '../../components/atoms/footer/footer';
import Header from '../../components/atoms/header/header';
import ProfileCard from '../../components/atoms/profileCard/profile_card';

const Setting = () => {
  const navigate = useNavigate();

  // 추후 프로필도 가져와서 업데이트
  const { userNickname, userProvider } = useSelector((state) => state.user);

  // 추후 회원탈퇴 구현
  const UnRegister = () => {
    alert('회원 탈퇴 미구현');
  };

  const MoveHome = () => {
    navigate('/');
  };

  const MoveEditProfile = () => {
    navigate('/setting/profile');
  };

  const MoveEditPassword = () => {
    if (userProvider === 'naver') return;

    navigate('/setting/passwd');
  };

  const MoveRecord = () => {
    navigate('/setting/record');
  };

  const MoveProfit = () => {
    navigate('/setting/profit');
  };

  return (
    <div className="setting col-sm-4">
      <Header title="설정" handleClick={MoveHome} />

      {/* url 나중에 프로필 정보 받아오는 걸로 교체 */}
      <ProfileCard
        url="https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151_960_720.jpg"
        nickname={userNickname}
      />

      <section className="setting-menu">
        <div className="setting-menu-title">개인정보</div>
        <BtnProfile text="프로필 수정" handleClick={MoveEditProfile} />
        <BtnProfile text="비밀번호 변경" handleClick={MoveEditPassword} />
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
