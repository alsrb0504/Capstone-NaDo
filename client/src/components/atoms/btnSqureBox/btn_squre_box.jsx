import React from 'react';

const BtnSqureBox = ({ handleClick, icon, text }) => (
  <button className="btn-squre" type="button" onClick={handleClick}>
    <img className="icon" src={`/images/${icon}.svg`} alt="아이콘" />
    <span className="name">{text}</span>
  </button>
);

export default BtnSqureBox;
