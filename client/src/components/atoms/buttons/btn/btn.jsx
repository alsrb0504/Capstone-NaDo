/* eslint-disable react/button-has-type */
import React from 'react';

const SUBMIT = 'submit';

const Btn = ({ text, type, color, handleClick }) => {
  function AssignEvent() {
    if (type !== SUBMIT) handleClick();
  }

  return (
    <button type={type} className={`btn btn-${color}`} onClick={AssignEvent}>
      {text}
    </button>
  );
};

export default Btn;
