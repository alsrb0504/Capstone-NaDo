import React from 'react';
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import Btn from '../../atoms/btn/btn';
// import LineInput from '../../atoms/lineInput/line_input';
import {
  IdCond,
  PasswdCond,
  NicknameCond,
} from '../../../services/formCondition';
import LineInputContainer from '../lineInputContainer/line_input_container';

const SignupLocalForm = ({ SignupWithLocal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
      nickname: '',
      email: '',
    },
  });

  const OnSubmit = (data) => {
    const { password, password2 } = data;

    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다');
      reset();
    }

    console.log('form info', data);

    SignupWithLocal(data);
    reset();
  };

  const IdCondition = IdCond;
  const PasswordCondition = PasswdCond;
  const NicknameCondition = NicknameCond;

  return (
    <form className="signup-local-form" onSubmit={handleSubmit(OnSubmit)}>
      <LineInputContainer
        desc="아이디"
        condition={IdCondition}
        id="identifier"
        register={register}
        errors={errors}
      />

      <LineInputContainer
        desc="비밀번호"
        condition={PasswordCondition}
        id="password"
        type="password"
        register={register}
        errors={errors}
      />

      <LineInputContainer
        desc="비밀번호 확인"
        condition={PasswordCondition}
        id="password2"
        type="password"
        register={register}
        errors={errors}
      />

      <LineInputContainer
        desc="닉네임"
        condition={NicknameCondition}
        id="nickname"
        register={register}
        errors={errors}
      />

      <LineInputContainer
        desc="이메일"
        //   condition={NicknameCondition}
        // 이메일 조건 아직 없음
        id="email"
        register={register}
        errors={errors}
      />

      <Btn text="PASS로 인증" />
      <div className="signup-local-form-btn-complete">
        <Btn type="submit" text="회원가입 완료" />
      </div>
    </form>
  );
};

export default SignupLocalForm;
