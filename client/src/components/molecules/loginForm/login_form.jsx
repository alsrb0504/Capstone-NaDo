import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Btn from '../../atoms/btn/btn';
import LineInput from '../../atoms/lineInput/line_input';
import { IdCond, PasswdCond } from '../../../services/formCondition';

const LoginForm = ({ LoginWithLocal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const OnSubmit = (data) => {
    console.log('form info', data);

    LoginWithLocal(data);
    reset();
  };

  const IdCondition = IdCond;
  const PasswordCondition = PasswdCond;

  return (
    <form className="login-form" onSubmit={handleSubmit(OnSubmit)}>
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

      <Btn type="submit" color="pink" text="로그인" />
    </form>
  );
};

export default LoginForm;
