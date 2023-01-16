import React from 'react';

const BtnSqureBox = React.memo(({ handleClick, icon, text }) => (
  <button className="btn-squre" type="button" onClick={handleClick}>
    <div className="btn-squre-inner">
      <img className="icon" src={`/icon/${icon}.svg`} alt="아이콘" />
      <span className="name">{text}</span>
    </div>
  </button>
));

export default BtnSqureBox;
