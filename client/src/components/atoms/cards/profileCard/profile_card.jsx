import React from 'react';

const ProfileCard = React.memo(({ url, nickname }) => {
  const defaultProfile = 'images/default_profile.svg';

  const profileUrl = url || defaultProfile;

  return (
    <div className="profile-card">
      <div className="profile-card-img-container">
        <img src={profileUrl} alt="프로필 이미지" />
      </div>
      <p className="profile-card-nickname">{nickname}</p>
    </div>
  );
});

export default ProfileCard;
