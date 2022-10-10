import React from "react";

// 추후엔 React-hook-form 을 사용한 컴포넌트로 교체
const LocalRegisterForm = ({ localRef, handleSubmit }) => {
  const OnSubmit = (e) => {
    e.preventDefault();
    console.log("submit start");
  };

  return (
    <form ref={localRef} action="#" onSubmit={OnSubmit}>
      <label htmlFor="id"></label>
      <input type="text" id="id" />
    </form>
  );
};

export default LocalRegisterForm;
