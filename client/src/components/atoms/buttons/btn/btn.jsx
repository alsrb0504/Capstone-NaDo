/* eslint-disable react/button-has-type */
import React from 'react';

const SUBMIT = 'submit';

// props로 전달된 handleClick => HandleClick (파스칼 케이스)로 변경.
const Btn = React.memo(({ text, type, color, HandleClick }) => {
  function AssignEvent() {
    if (type !== SUBMIT) HandleClick();
  }

  return (
    <button type={type} className={`btn btn-${color}`} onClick={AssignEvent}>
      {text}
    </button>
  );
});

export default Btn;
