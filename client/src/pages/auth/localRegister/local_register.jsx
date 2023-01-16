import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LocalSignup } from '../../../store/features/user';
import Header from '../../../components/atoms/headers/header/header';
import SignupLocalForm from '../../../components/molecules/signupLocalForm/signup_local_form';
import useMove from '../../../hooks/useMove';

const LocalRegister = () => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

  const SignupWithLocal = useCallback(
    (info) => {
      dispatch(LocalSignup(info));
    },
    [dispatch],
  );

  const MoveLogin = useCallback(() => {
    HandleMove('/login');
  }, [HandleMove]);

  return (
    <div className="register col-sm-4">
      <Header HandleClick={MoveLogin} />
      <SignupLocalForm SignupWithLocal={SignupWithLocal} />
    </div>
  );
};

export default LocalRegister;
