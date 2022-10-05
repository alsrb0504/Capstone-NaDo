import React from "react";

const LineInput = ({ desc, name, val }) => {
  return (
    <input
      className="line-input"
      type="text"
      name={name}
      placeholder={desc}
      value={val}
      disabled={val ? true : false}
    />
  );
};

export default LineInput;
