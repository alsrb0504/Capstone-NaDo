import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/atoms/footer/footer';
import HeaderWithLogo from '../../../components/atoms/headerWithLogo/header_with_logo';

const OrderHome = () => {
  const navigate = useNavigate();

  const { userNickname } = useSelector((state) => state.user);

  const MoveHome = () => navigate('/');

  return (
    <div className="col-sm-4 order-home">
      <HeaderWithLogo handleClick={MoveHome} />
      <div>{userNickname || '닉네임'}</div>

      {/* 가게 아이템들 */}

      <Footer />
    </div>
  );
};

export default OrderHome;
