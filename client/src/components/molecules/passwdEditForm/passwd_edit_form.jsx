import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PasswdCond } from '../../../services/formCondition';
import { ChangePasswd } from '../../../store/features/user';
import Btn from '../../atoms/btn/btn';
import LineInput from '../../atoms/lineInput/line_input';

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
    console.log(prevPasswd, newPasswd, newPasswd2);

    // 나중에 제거
    if (false) {
      dispatch(ChangePasswd({ prevPasswd, newPasswd }));
    }
  };

  return (
    <form className="passwd-edit-form" onSubmit={handleSubmit(OnSubmit)}>
      <div className="line-input-container">
        <LineInput
          desc="기존 비밀번호"
          condition={PasswdCondition}
          id="prevPasswd"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="prevPasswd"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="line-input-container">
        <LineInput
          desc="새 비밀번호"
          condition={PasswdCondition}
          id="newPasswd"
          type="password"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="newPasswd"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="line-input-container">
        <LineInput
          desc="새 비밀번호 확인"
          condition={PasswdCondition}
          id="newPasswd2"
          type="password"
          register={register}
        />
        <ErrorMessage
          errors={errors}
          name="newPasswd2"
          as="p"
          className="line-input-error is-margin-bottom"
        />
      </div>

      <div className="passwd-edit-form-btn">
        <Btn type="submit" text="비밀번호 변경 완료" />
      </div>
    </form>
  );
};

export default PasswdEditForm;
