import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/atoms/header/header';
import PasswdEditForm from '../../components/molecules/passwdEditForm/passwd_edit_form';

const ChangePassword = () => {
  const navigate = useNavigate();

  const MoveBack = () => navigate('/setting');

  return (
    <div className="col-sm-4 change-passwd">
      <Header title="비밀번호 변경" handleClick={MoveBack} />

      <PasswdEditForm />
    </div>
  );
};

export default ChangePassword;
