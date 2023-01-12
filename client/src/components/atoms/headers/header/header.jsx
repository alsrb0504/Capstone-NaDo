import React, { useCallback } from 'react';

const Header = React.memo(({ title, handleClick }) => {
  const OnClick = useCallback(() => {
    handleClick();
  }, [handleClick]);

  return (
    <header className="header-box">
      <button type="button" className="arrow-box" onClick={OnClick}>
        <i className="fa-solid fa-arrow-left" />
      </button>

      <div className="title">{title}</div>
    </header>
  );
});

export default Header;
