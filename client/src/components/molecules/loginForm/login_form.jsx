import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Btn from '../../atoms/btn/btn';
import LineInput from '../../atoms/lineInput/line_input';

const LoginForm = ({ LoginWithLocal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const OnSubmit = (data) => {
    LoginWithLocal(data);
    reset();
  };

  const IdCondition = {
    require: true,
    minLength: {
      value: 4,
      message: '아이디는 4자 이상 입력해주세요',
    },
    maxLength: {
      value: 16,
      message: '아이디는 16자 이하로 입력해주세요',
    },
  };

  const PasswordCondition = {
    require: true,
    minLength: {
      value: 4,
      message: '비밀번호는 4자 이상 입력해주세요',
    },
    maxLength: {
      value: 16,
      message: '비밀번호은 16자 이하로 입력해주세요',
    },
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)}>
      <input type="text" />
      <LineInput
        desc="아이디"
        condition={IdCondition}
        id="id"
        register={register}
      />
      <ErrorMessage errors={errors} name="id" as="p" className="input-error" />

      <LineInput
        desc="비밀번호"
        condition={PasswordCondition}
        id="password"
        register={register}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        as="p"
        className="input-error"
      />

      <Btn type="submit" color="pink" text="로그인" />
    </form>
  );
};

export default LoginForm;
