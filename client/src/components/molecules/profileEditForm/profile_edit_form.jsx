import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NicknameCond } from '../../../services/formCondition';
import { UpdateProfile } from '../../../store/features/user';
import Btn from '../../atoms/buttons/btn/btn';
import LineInput from '../../atoms/inputs/lineInput/line_input';

const ProfileEditForm = () => {
  const dispatch = useDispatch();

  // 추후 이미지도 가져올 수 있도록 수정
  const { userNickname, userId } = useSelector((state) => state.user);

  // default Value
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      nickname: userNickname,
      // image: userProfile
      image: '',
      identifier: userId,
    },
  });

  const NicknameCondition = NicknameCond;

  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('image');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const OnSubmit = (data) => {
    console.log('form info', data);

    dispatch(UpdateProfile(data));
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit(OnSubmit)}>
      <div className="avatar-container">
        {/* 추후 디폴트 이미지로 교체 */}
        <div className="avatar">
          <img
            className="avatar-img"
            src={
              avatarPreview ||
              'https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151_960_720.jpg' ||
              'https://cdn.pixabay.com/photo/2022/10/13/07/54/crane-houses-7518536_960_720.jpg'
            }
            alt="이미지 미리보기"
          />

          <input
            className="file-input"
            {...register('image')}
            type="file"
            id="profile"
            accept="image/*"
          />
        </div>

        <div className="camera-container">
          <img className="camera-img" src="/icon/camera.svg" alt="카메라" />
        </div>
      </div>

      <LineInput
        desc={userNickname}
        condition={NicknameCondition}
        id="nickname"
        register={register}
        errors={errors}
      />

      <div className="edit-profile-form-btn">
        <Btn type="submit" text="프로필 수정 완료" />
      </div>
    </form>
  );
};

export default ProfileEditForm;
