import React from "react";
import Btn from "../../components/atoms/btn/btn";
import LineInput from "../../components/atoms/lineInput/line_input";

const LocalRegister = (props) => {
  return (
    <div className="col-sm-4 register">
      <div className="local-register-lineinput1">
        <LineInput
          name="아이디"
          desc="아이디"
          value="userid"
        />
      </div>

      <div className="local-register-lineinput2">
        <LineInput
          name="비밀번호"
          desc="비밀번호"
          value="pw"
        />
      </div>

      <div className="local-register-lineinput2">
        <LineInput
          name="비밀번호 확인"
          desc="비밀번호 확인"
          value="pwcheck"
        />
      </div>

      <div className="local-register-lineinput2">
        <LineInput
          name="닉네임"
          desc="닉네임"
          value="nickname"
        />
      </div>

      <div className="local-register-lineinput2">
        <LineInput
          name="이메일"
          desc="이메일"
          value="email"
        />
      </div>

      <div className="local-register-btn-pass">
        <Btn
          text="PASS로 인증"
        />
      </div>

      <div className="local-register-btn-complete">
        <Btn
          text="회원가입 완료"
        />
      </div>
    </div>
  );
};

export default LocalRegister;
