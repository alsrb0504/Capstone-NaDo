import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogout } from '../../store/features/user';

const TestHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userNickname, isLogin } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(LocalLogout());
  };

  useEffect(() => {
    if (!isLogin) navigate('/test/login');
  }, [navigate, isLogin]);

  return (
    <>
      <div>TestHome</div>
      <br />
      <h3>{userNickname}님 환영합니다.</h3>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default TestHome;
