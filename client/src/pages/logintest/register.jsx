import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LocalSignup } from "../../store/features/user";

const TestLocalRegister = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError } = useSelector((state) => state.user);

  const OnLocalSubmit = async () => {
    // 추후엔 Ref로 Form의 input 값들을 가져올 것
    // 더미 로컬 회원가입 데이터
    const userInfo = {
      identifier: "user",
      password: "1234",
      nickname: "test",
      email: "test@gmail.com",
    };

    dispatch(LocalSignup(userInfo));
  };

  useEffect(() => {
    if (isSuccess) navigate("/test/login");
    if (isError) {
      alert("회원가입 실패");
      navigate("/test/login");
    }
  }, [navigate, isSuccess, isError]);

  return (
    <div>
      <button
        className="col-sm-4"
        style={{ marginBottom: "16px", backgroundColor: "tomato" }}
      >
        pass 인증
      </button>
      {!isFetching && (
        <button
          onClick={OnLocalSubmit}
          className="col-sm-4"
          style={{ marginBottom: "16px", backgroundColor: "tomato" }}
        >
          회원가입 완료
        </button>
      )}
      {isFetching && (
        <button
          className="col-sm-4"
          style={{ marginBottom: "16px", backgroundColor: "powderBlue" }}
        >
          Loading...
        </button>
      )}
    </div>
  );
};

export default TestLocalRegister;
