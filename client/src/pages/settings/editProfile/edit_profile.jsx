import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../../components/atoms/headers/header/header';
import ProfileEditForm from '../../../components/molecules/profileEditForm/profile_edit_form';
import useMove from '../../../hooks/useMove';
import { UpdateProfile } from '../../../store/features/user';
import { SwalSuccess } from '../../../utils/swal';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { MoveBack } = useMove();

  const ChangeProfile = useCallback(
    (data) => {
      const popupTimer = 1200;

      dispatch(UpdateProfile(data));
      SwalSuccess('프로필 업데이트 성공!', popupTimer);

      setTimeout(() => {
        MoveBack();
      }, popupTimer);
    },
    [dispatch, MoveBack],
  );

  return (
    <div className="col-sm-4 edit-profile">
      <Header title="프로필 수정" HandleClick={MoveBack} />

      <ProfileEditForm ChangeProfile={ChangeProfile} />
    </div>
  );
};

export default EditProfile;
