import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IdCond, PasswdCond, NicknameCond } from '../../../utils/formCondition';
import { CleanUpSuccess } from '../../../store/features/user';
import Btn from '../../atoms/buttons/btn/btn';
import LineInputContainer from '../lineInputContainer/line_input_container';
import useMove from '../../../hooks/useMove';

const SignupLocalForm = ({ SignupWithLocal }) => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

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

  const { isSuccess, isError } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSuccess) {
      HandleMove('/login');
      dispatch(CleanUpSuccess());
    }
    if (isError) reset();
  }, [isSuccess, isError, reset, dispatch, HandleMove]);

  const OnSubmit = (data) => {
    const { password, password2 } = data;

    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다');
      reset();
    }

    SignupWithLocal(data);
  };

  const IdCondition = IdCond;
  const PasswordCondition = PasswdCond;
  const NicknameCondition = NicknameCond;

  return (
    <form className="signup-local-form" onSubmit={handleSubmit(OnSubmit)}>
      <section className="signup-local-form-inputs">
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
      </section>

      <div className="signup-local-form-btn-complete">
        <Btn type="submit" text="회원가입 완료" />
      </div>
    </form>
  );
};

export default SignupLocalForm;
