import React from 'react';

const BtnBox = React.memo(({ text, url, handleClick }) => (
  <button type="button" className="btn-box" onClick={handleClick}>
    <div className="btn-box-icon-container">
      <img className="btn-box-icon" src={url} alt="social" />
    </div>
    <span className="btn-box-text">{text}</span>
  </button>
));

export default BtnBox;
