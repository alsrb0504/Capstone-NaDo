import React, { useCallback } from 'react';

const BtnProfile = React.memo(({ text, HandleClick }) => {
  const OnClick = useCallback(() => {
    HandleClick();
  }, [HandleClick]);

  return (
    <button type="button" className="btn-profile" onClick={OnClick}>
      <span className="name">{text}</span>
      <i className="fa-solid fa-chevron-right" />
    </button>
  );
});

export default BtnProfile;
