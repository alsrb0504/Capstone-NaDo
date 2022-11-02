import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PasswdCond } from '../../../services/formCondition';
import { ChangePasswd } from '../../../store/features/user';
import Btn from '../../atoms/btn/btn';
import LineInputContainer from '../lineInputContainer/line_input_container';

const PasswdEditForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const PasswdCondition = PasswdCond;

  const OnSubmit = (data) => {
    const { prevPasswd, newPasswd, newPasswd2 } = data;

    if (newPasswd !== newPasswd2) {
      alert('비밀번호가 일치하지 않습니다');
      reset();
    }

    console.log('data', data);

    // 나중에 제거
    dispatch(ChangePasswd({ prevPasswd, newPasswd }));
  };

  return (
    <form className="passwd-edit-form" onSubmit={handleSubmit(OnSubmit)}>
      <LineInputContainer
        desc="기존 비밀번호"
        condition={PasswdCondition}
        id="prevPasswd"
        type="password"
        register={register}
        errors={errors}
      />

      <LineInputContainer
        desc="새 비밀번호"
        condition={PasswdCondition}
        id="newPasswd"
        type="password"
        register={register}
        errors={errors}
      />

      <LineInputContainer
        desc="새 비밀번호 확인"
        condition={PasswdCondition}
        id="newPasswd2"
        type="password"
        register={register}
        errors={errors}
      />

      <div className="passwd-edit-form-btn">
        <Btn type="submit" text="비밀번호 변경 완료" />
      </div>
    </form>
  );
};

export default PasswdEditForm;
