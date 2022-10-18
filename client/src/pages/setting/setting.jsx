import React from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/atoms/footer/footer';
import Header from '../../components/atoms/header/header';
import ProfileCard from '../../components/atoms/profileCard/profile_card';

const Setting = () => {
  const navigate = useNavigate();

  // const { userNickname } = useSelector((state) => state.user);

  const MoveHome = () => {
    navigate('/');
  };

  return (
    <div className="setting col-sm-4">
      <Header handleClick={MoveHome} />

      <ProfileCard
        url="https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151_960_720.jpg"
        nickname="테스트 유저"
      />

      <Footer />
    </div>
  );
};

export default Setting;
