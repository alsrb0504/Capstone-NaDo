import React from 'react';

const Header = ({ title, handleClick }) => {
  const OnClick = () => {
    handleClick();
  };

  //   헤더 디자인하기 !!
  return (
    <header className="header-box">
      <button type="button" className="arrow-box" onClick={OnClick}>
        <i className="fa-solid fa-arrow-left" />
      </button>

      <div className="title">{title}</div>
    </header>
  );
};

export default Header;
