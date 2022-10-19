import React from 'react';
import { useForm } from 'react-hook-form';
import Btn from '../../atoms/btn/btn';
import LineInput from '../../atoms/lineInput/line_input';

const PasswdEditForm = () => {
  const { register, handleSubmit } = useForm();

  const OnSubmit = (data) => {
    console.log('data', data);
  };

  return (
    <form className="passwd-edit-form" onSubmit={handleSubmit(OnSubmit)}>
      <LineInput
        desc="기존 비밀번호"
        // condition={}
        id="nickname"
        register={register}
      />

      <LineInput
        desc="새 비밀번호"
        // condition={}
        id="nickname"
        register={register}
      />

      <LineInput
        desc="새 비밀번호 확인"
        // condition={}
        id="nickname"
        register={register}
      />

      <div className="passwd-edit-form-btn">
        <Btn type="submit" text="프로필 수정 완료" />
      </div>
    </form>
  );
};

export default PasswdEditForm;
