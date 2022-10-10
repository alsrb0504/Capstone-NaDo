import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LocalRegisterForm from "../../components/organisms/localRegisterForm/local_register_form";
import SocialRegisterForm from "../../components/organisms/socialRegisterForm/social_register_form";
import { LocalSignup } from "../../store/features/user";

const TestRegister = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess } = useSelector((state) => state.user);

  const location = window.location.href.split("=")[1];
  const access_token = location && location.split("&")[0];

  const localRef = useRef();

  const OnSocialSubmit = (_) => {};

  const OnLocalSubmit = async (_) => {
    // 추후엔 Ref로 Form의 input 값들을 가져올 것
    // console.log(localRef);

    // 더미 로컬 회원가입 데이터
    const userInfo = {
      id: "user",
      password: "1234",
      nickname: "test",
      email: "test@gmail.com",
    };

    // 회원가입 후, 리다이렉션 방법 4
    // navigate 객체를 action 함수에 전달
    dispatch(LocalSignup({ ...userInfo, navigate }));
  };

  let SocialNickname;
  let SocialEmail;

  const RequestSocial = async () => {
    const data = await axios.get(
      "https://openapi.naver.com/v1/nid/me?",
      {},
      {
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      }
    );

    console.log(data);
  };

  useEffect(() => {
    console.log(access_token);
    if (access_token) {
      RequestSocial();
    }
  }, [access_token]);

  return (
    <div>
      {access_token && (
        <SocialRegisterForm nickname={SocialNickname} email={SocialEmail} />
      )}
      {!access_token && (
        <LocalRegisterForm localRef={localRef} handleSubmit={OnLocalSubmit} />
      )}

      <button
        className="col-sm-4"
        style={{ marginBottom: "16px", backgroundColor: "tomato" }}
      >
        pass 인증
      </button>
      {!isFetching && (
        <button
          onClick={access_token ? () => alert("social") : OnLocalSubmit}
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

export default TestRegister;
