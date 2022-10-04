import React from "react";

const TestBtn = ({ callback }) => {
  const handleClick = () => {
    callback();
  };

  return (
    <button className="testBtn col-sm-4" onClick={handleClick}>
      testBtn
    </button>
  );
};

export default TestBtn;
