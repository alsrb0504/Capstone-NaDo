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

  const logout = (e) => {
    dispatch(LocalLogout());
    // if (userProvider === "local") {
    // }
  };

  useEffect(() => {
    if (!isLogin) navigate("/test/login");
  }, [navigate, isLogin]);

  return (
    <>
      <div>TestHome</div>
      <br />
      <h3>{userNickname}님 환영합니다.</h3>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default TestHome;
