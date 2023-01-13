import React from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../../components/atoms/headers/header/header';
import ProfileEditForm from '../../../components/molecules/profileEditForm/profile_edit_form';
import useMove from '../../../hooks/useMove';
import { UpdateProfile } from '../../../store/features/user';
import { SwalSuccess } from '../../../utils/swal';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { MoveBack } = useMove();

  const ChangeProfile = (data) => {
    dispatch(UpdateProfile(data));

    const popupTimer = 1200;

    SwalSuccess('프로필 업데이트 성공!', popupTimer);

    setTimeout(() => {
      MoveBack();
    }, popupTimer);
  };

  return (
    <div className="col-sm-4 edit-profile">
      <Header title="프로필 수정" handleClick={MoveBack} />

      <ProfileEditForm ChangeProfile={ChangeProfile} />
    </div>
  );
};

export default EditProfile;
