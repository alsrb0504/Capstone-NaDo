import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalSignup } from '../../store/features/user';
import Header from '../../components/atoms/header/header';
import SignupLocalForm from '../../components/molecules/signupLocalForm/signup_local_form';

const LocalRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupWithLocal = (info) => {
    dispatch(LocalSignup(info));
  }

  const MoveLogin = () => {
    navigate('/login');
  }

  return (
    <div className='register col-sm-4'>
      <Header handleClick={MoveLogin}/>
      <SignupLocalForm SignupWithLocal={SignupWithLocal} />

    </div>
  );
};
export default LocalRegister;