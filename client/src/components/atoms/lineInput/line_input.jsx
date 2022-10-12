import React from 'react';

const LineInput = ({ desc, name, val }) => (
  <input
    className="line-input"
    type="text"
    name={name}
    placeholder={desc}
    value={val}
    disabled={!!val}
  />
);

export default LineInput;
