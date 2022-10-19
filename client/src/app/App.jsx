/* eslint-disable no-lone-blocks */
import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AxiosSetting from '../services/axios';
import Home from '../pages/home/home';
import TestApp from '../pages/logintest/testApp';
import Login from '../pages/login/login';
import LocalRegister from '../pages/localRegister/local_register';
import SocialRegister from '../pages/socialRegister/social_register';
import { GetUserWithSession } from '../store/features/user';
import Setting from '../pages/setting/setting';
import EditProfile from '../pages/editProfile/edit_profile';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AxiosSetting();
    dispatch(GetUserWithSession());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register">
              <Route path="local" element={<LocalRegister />} />
              <Route path="social" element={<SocialRegister />} />
            </Route>
            <Route path="/setting">
              <Route index element={<Setting />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>
            {/* 구분선 : 테스트 페이지 */}
            <Route path="/test/*" element={<TestApp />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

{
  /* <>
  <Boxinput desc={"닉네임"} />
  <LineInput desc="비밀번호 확인" name="password2" />
  <LineInput desc="비밀번호 확인" name="password2" val="value" />
  <RecordCard
    info={{
      place: "소프트웨어관 303호",
      date: "21.09.08 13:35",
      price: "8900",
      isOrder: true,
    }}
  />
  <RecordCard
    info={{
      place: "소프트웨어관 303호",
      date: "21.09.08 13:35",
      price: "8900",
      isOrder: false,
    }}
  />
  <OrderStoreCard
    info={{
      name: "스타벅스",
      url: "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg",
      isOpen: true,
    }}
    handleClick={testFunc}
  />

  <PickupStoreCard
    info={{
      name: "스타벅스",
      url: "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg",
      orderCnt: 10,
      isOpen: true,
    }}
    handleClick={testFunc}
  />

  <PickingCard
    info={{
      place: "소프트웨어관 303호",
      date: "21.09.08 13:35",
      price: "8900",
      isOrder: true,
    }}
    handleClick={testFunc}
  />

  <OrderingCard
    info={{
      name: "스타벅스",
      options: ["샷 추가(+500원)"],
      price: 5900,
      cnt: 3,
    }}
    updateCount={testFunc}
  />

  <OrderCompleteCard
    info={{
      name: "스타벅스",
      options: ["샷 추가(+500원)"],
      price: 5900,
      cnt: 3,
    }}
  />

  <PickupReadyCard
    info={{
      place: "소프트웨어관 303호",
      date: "13 : 35",
      price: "8900",
    }}
  />
</>; */
}
