import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ChangePasswd } from '../../../store/features/user';
import Btn from '../../atoms/btn/btn';
import LineInput from '../../atoms/lineInput/line_input';

const PasswdEditForm = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const OnSubmit = (data) => {
    const { prevPasswd, newPasswd, newPasswd2 } = data;

    if (newPasswd !== newPasswd2) {
      alert('비밀번호가 일치하지 않습니다');
      reset();
    }

    console.log('data', data);
    console.log(prevPasswd, newPasswd, newPasswd2);

    dispatch(ChangePasswd({ prevPasswd, newPasswd }));
  };

  return (
    <form className="passwd-edit-form" onSubmit={handleSubmit(OnSubmit)}>
      <LineInput
        desc="기존 비밀번호"
        // condition={}
        id="prevPasswd"
        register={register}
      />

      <LineInput
        desc="새 비밀번호"
        // condition={}
        id="newPasswd"
        type="password"
        register={register}
      />

      <LineInput
        desc="새 비밀번호 확인"
        // condition={}
        id="newPasswd2"
        type="password"
        register={register}
      />

      <div className="passwd-edit-form-btn">
        <Btn type="submit" text="비밀번호 변경 완료" />
      </div>
    </form>
  );
};

export default PasswdEditForm;
