/* eslint-disable react/button-has-type */
import React from 'react';

const SUBMIT = 'submit';

const Btn = ({ text, type, color, handleClick }) => {
  const OnClick = () => {
    handleClick();
  };

  const AssignEvent = () => {
    if (text === SUBMIT) return null;
    return OnClick;
  };

  return (
    <button type={type} className={`btn btn-${color}`} onClick={AssignEvent}>
      {text}
    </button>
  );
};

export default Btn;
