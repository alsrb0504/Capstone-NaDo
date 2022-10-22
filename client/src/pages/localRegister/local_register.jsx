import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/atoms/header/header';
import SignupLocalForm from '../../components/molecules/signupLocalForm/signup_local_form';

const LocalRegister = () => {
  const navigate = useNavigate();

  const MoveLogin = () => {
    navigate('/login');
  }

  return (
    <div className='register col-sm-4'>
      <Header handleClick={MoveLogin}/>
      <SignupLocalForm />

    </div>
  );
};
export default LocalRegister;