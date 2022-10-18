import React from 'react';

const BtnProfile = ({ text, handleClick }) => {
  const OnClick = () => {
    handleClick();
  };

  return (
    <button type="button" className="btn-profile" onClick={OnClick}>
      <span className="name">{text}</span>
      <i className="fa-solid fa-chevron-right" />
    </button>
  );
};

export default BtnProfile;
