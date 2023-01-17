/* eslint-disable no-lone-blocks */
import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AxiosSetting from '../utils/axios';
import { GetUserWithSession } from '../store/features/user';

import Home from '../pages/home/home';
import * as AuthPage from '../pages/auth/index';
import * as OrderPage from '../pages/order/index';
import * as PickupPage from '../pages/pickup/index';
import * as SettingPage from '../pages/settings/index';

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
            <Route path="/login" element={<AuthPage.Login />} />
            <Route path="/register">
              <Route path="local" element={<AuthPage.Register />} />
            </Route>
            <Route path="/setting">
              <Route index element={<SettingPage.SettingHome />} />
              <Route path="profile" element={<SettingPage.EditProfile />} />
              <Route path="passwd" element={<SettingPage.ChangePassword />} />
              <Route
                path="order_history"
                element={<SettingPage.OrderHistory />}
              />
              <Route
                path="income_calculate"
                element={<SettingPage.IncomeCalculate />}
              />
            </Route>

            <Route path="/order">
              <Route index element={<OrderPage.OrderHome />} />
              <Route path="store" element={<OrderPage.OrderStore />} />
              <Route path="cart" element={<OrderPage.OrderCart />} />
              <Route path="payment" element={<OrderPage.OrderPayment />} />
              <Route path="confirm" element={<OrderPage.OrderConfirm />} />
              <Route path="waitings" element={<OrderPage.OrderWaitings />} />
              <Route path="option" element={<OrderPage.OrderOption />} />
              <Route path="detail" element={<OrderPage.OrderDetail />} />
              <Route path="report" element={<OrderPage.OrderReport />} />
            </Route>

            <Route path="/pickup">
              <Route index element={<PickupPage.PickupHome />} />
              <Route path="store" element={<PickupPage.PickupStore />} />
              <Route path="mypickup" element={<PickupPage.PickupMyPickup />} />
              <Route path="detail" element={<PickupPage.PickupDetail />} />
              <Route
                path="processing"
                element={<PickupPage.PickupProcessing />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
