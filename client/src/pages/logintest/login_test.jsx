import React from "react";
import { Route, Routes } from "react-router-dom";
import TestHome from "./home";
import TestLogin from "./login";
import TestRegister from "./register";

const LoginTest = (props) => {
  return (
    <div>
      {/* 구분선 */}
      <Routes>
        <Route path="/" element={<TestHome />} />
        <Route path="/login" element={<TestLogin />} />
        <Route path="/register" element={<TestRegister />} />
      </Routes>
    </div>
  );
};

export default LoginTest;
