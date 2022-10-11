import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LocalLogout } from "../../store/features/user";

const TestHome = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userNickname, userProvider, isLogin } = useSelector(
    (state) => state.user
  );

  // 추후 로컬 로그아웃 기능 확인되면 로그 제거
  const logout = (e) => {
    console.log("액션 함수 실행 전");

    dispatch(LocalLogout());

    console.log("액션 함수 실행 후");
  };

  useEffect(() => {
    if (!isLogin) navigate("/test/login");
  }, [navigate, isLogin]);

  return (
    <>
      <div>TestHome</div>
      <br />
      <h3>{userNickname}님 환영합니다.</h3>
      <button
        style={{
          width: "150px",
          height: "100px",
          backgroundColor: "greenyellow",
          color: "white",
        }}
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

export default TestHome;
