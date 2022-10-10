import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LocalLogin } from "../store/features/user";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { naver } = window;

  const initializeNaverLogin = useCallback(() => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      // isPopup: true,
      loginButton: { color: "white", type: 1, height: 60 },
      callbackHandle: true,
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.nickname;

        console.log(userid, username);
      }
    });
  }, [naver]);

  const MoveRegister = () => {
    navigate("/register");
  };

  const LoginWithLocal = () => {
    //
    const userInfo = {
      id: "test",
      password: "1234",
    };

    dispatch(LocalLogin({ ...userInfo, navigate }));
  };

  useEffect(() => {
    initializeNaverLogin();
  }, [initializeNaverLogin]);

  return (
    <div className="col-sm-4">
      <h1 style={{ fontSize: "2rem" }}>로그인 페이지</h1>

      <div
        onClick={MoveRegister}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "tomato",
          textAlign: "center",
        }}
      >
        로컬 회원가입
      </div>
      <div id="naverIdLogin"></div>

      <div
        onClick={LoginWithLocal}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "orange",
          textAlign: "center",
        }}
      >
        로컬 로그인
      </div>
    </div>
  );
};

export default Login;
