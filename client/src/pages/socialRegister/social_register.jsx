import React from 'react';
import Boxinput from '../../components/atoms/boxInput/box_input';
import Btn from '../../components/atoms/btn/btn';

const SocialRegister = () => (
  <div className="col-sm-4 register">
    <div className="social-register-nickname">
      <Boxinput desc="닉네임" text="Nickname" />
    </div>

    <div className="social-register-email">
      <Boxinput desc="이메일" text="email" />
    </div>

    <Btn text="PASS로 인증" />

    <div className="social-register-btn-complete">
      <Btn text="회원가입 완료" />
    </div>
  </div>
);

export default SocialRegister;
