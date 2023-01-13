import React from 'react';
import { useDispatch } from 'react-redux';
import { LocalSignup } from '../../../store/features/user';
import Header from '../../../components/atoms/headers/header/header';
import SignupLocalForm from '../../../components/molecules/signupLocalForm/signup_local_form';
import useMove from '../../../hooks/useMove';

const LocalRegister = () => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

  const SignupWithLocal = (info) => {
    dispatch(LocalSignup(info));
  };

  const MoveLogin = () => {
    HandleMove('/login');
  };

  return (
    <div className="register col-sm-4">
      <Header handleClick={MoveLogin} />
      <SignupLocalForm SignupWithLocal={SignupWithLocal} />
    </div>
  );
};
export default LocalRegister;
