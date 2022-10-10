import React from "react";
import Btn from "../../components/atoms/btn/btn";
import LineInput from "../../components/atoms/lineInput/line_input";

const Login = (props) => {
  return (
    <div className="col-sm-4 login-background">
      <img className="login-logo" src="images/logo.svg" alt="logo"/>

      <div className="login-id">
        <LineInput
          desc="아이디"
          name="userid"
          val="아이디"
        />
      </div>

      <div className="login-pw">
        <LineInput
          desc="비밀번호"
          name="password"
          val="비밀번호"
        />
      </div>

      <Btn
        color="pink"
        text="로그인"
      />

      <div className="login-btn-box">
        <div className="login-btn-social">
          <div className="box"><img className="icon" src="images/naver_icon.svg" alt="social"/></div>
          <span className="text">네이버</span>
        </div>
        
        <div className="login-btn-local">
          <div className="box"><img className="icon" src="images/signup_icon.svg" alt="local"/></div>
          <span className="text">회원가입</span>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
