import React from 'react';
import { useForm } from 'react-hook-form';
import Btn from '../../atoms/buttons/btn/btn';
import { IdCond, PasswdCond } from '../../../utils/formCondition';
import LineInputContainer from '../lineInputContainer/line_input_container';

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
    LoginWithLocal(data);
    reset();
  };

  const IdCondition = IdCond;
  const PasswordCondition = PasswdCond;

  return (
    <form className="login-form" onSubmit={handleSubmit(OnSubmit)}>
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

      <Btn type="submit" color="pink" text="로그인" />
    </form>
  );
};

export default LoginForm;
