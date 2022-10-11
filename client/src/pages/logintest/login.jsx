import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalLogin } from '../../store/features/user';

const TestLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin } = useSelector((state) => state.user);

  const MoveRegister = () => {
    navigate('/test/register/local');
  };

  const LoginWithLocal = () => {
    const userInfo = {
      identifier: 'user',
      password: '1234',
    };

    dispatch(LocalLogin(userInfo));
  };

  const LoginWithSocial = () => {
    console.log('네이버 로그인 시작');

    window.location.href = 'http://localhost:3001/auth/social/login';

    // 이거 안뜨는게 정상
    console.log('네이버 로그인 끝');
  };

  useEffect(() => {
    // 민준이가 로컬 로그인도 리다이렉션 시켜준다는데..
    // 그럼 이 부분이 필요 없으러냐..?
    if (isLogin) navigate('/test/');
  }, [navigate, isLogin]);

  return (
    <div className="col-sm-4">
      <h1 style={{ fontSize: '2rem' }}>로그인 페이지</h1>

      <button
        type="button"
        onClick={MoveRegister}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'tomato',
          textAlign: 'center',
        }}
      >
        로컬 회원가입
      </button>

      <button
        type="button"
        onClick={LoginWithLocal}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'orange',
          textAlign: 'center',
        }}
      >
        로컬 로그인
      </button>

      <button
        type="button"
        onClick={LoginWithSocial}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'green',
          color: 'white',
          textAlign: 'center',
        }}
      >
        네이버 로그인
      </button>
    </div>
  );
};

export default TestLogin;
