import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import ProfileEditForm from '../../../components/molecules/profileEditForm/profile_edit_form';

const EditProfile = () => {
  const navigate = useNavigate();

  const MoveBack = () => navigate('/setting');

  return (
    <div className="col-sm-4 edit-profile">
      <Header title="프로필 수정" handleClick={MoveBack} />

      <ProfileEditForm />
    </div>
  );
};

export default EditProfile;
