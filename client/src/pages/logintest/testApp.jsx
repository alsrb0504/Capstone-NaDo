import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TestHome from './home';
import TestLogin from './login';
import TestLocalRegister from './register';

const TestApp = () => (
  <div>
    {/* 구분선 */}
    <Routes>
      <Route path="/" element={<TestHome />} />
      <Route path="/login" element={<TestLogin />} />
      <Route path="/register/local" element={<TestLocalRegister />} />
    </Routes>
  </div>
);

export default TestApp;
