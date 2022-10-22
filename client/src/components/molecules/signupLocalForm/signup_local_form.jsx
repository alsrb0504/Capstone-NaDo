import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Btn from '../../atoms/btn/btn';
import LineInput from '../../atoms/lineInput/line_input';
import { IdCond, PasswdCond, NicknameCond } from '../../../services/formCondition';

const SignupLocalForm = ({ LocalSignup }) => {
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
    const {password, password2} = data;

    if (password !== password2) {
        alert('비밀번호가 일치하지 않습니다');
        reset();
    }

    console.log('form info', data);

    LocalSignup(data);
    reset();
  };

  const IdCondition = IdCond;
  const PasswordCondition = PasswdCond;
  const NicknameCondition = NicknameCond;

  return (
    <form className="signup-local-form" onSubmit={handleSubmit(OnSubmit)}>
      <div className="line-input-container">
        <LineInput
          desc="아이디"
          condition={IdCondition}
          id="identifier"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="identifier"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="line-input-container">
        <LineInput
          desc="비밀번호"
          condition={PasswordCondition}
          id="password"
          type="password"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="line-input-container">
        <LineInput
          desc="비밀번호 확인"
          condition={PasswordCondition}
          id="password2"
          type="password" 
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="password2"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="line-input-container">
        <LineInput
          desc="닉네임"
          condition={NicknameCondition}
          id="nickname"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="nickname"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="line-input-container">
        <LineInput
          desc="이메일"
        //   condition={NicknameCondition}
        // 이메일 조건 아직 없음
          id="email"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <Btn text="PASS로 인증" />
      <div className='signup-local-form-btn-complete'>
        <Btn type="submit" text="회원가입 완료" />
      </div>
    </form>
  );
};

export default SignupLocalForm;
