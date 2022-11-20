/* eslint-disable no-lone-blocks */
import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AxiosSetting from '../utils/axios';
import Home from '../pages/home/home';
import Login from '../pages/auth/login/login';
import LocalRegister from '../pages/auth/localRegister/local_register';
import { GetUserWithSession } from '../store/features/user';
import Setting from '../pages/settings/setting/setting';
import EditProfile from '../pages/settings/editProfile/edit_profile';
import ChangePassword from '../pages/settings/edtiPasswd/edit_passwd';
import OrderHome from '../pages/order/orderHome/order_home';
import OrderStore from '../pages/order/orderStore/order_store';
import OrderCart from '../pages/order/orderCart/order_cart';
import OrderPayment from '../pages/order/orderPayment/order_payment';
import OrderConfirm from '../pages/order/orderConfirm/order_confirm';
import OrderWaitings from '../pages/order/orderWaitings/order_waitings';
import OrderOption from '../pages/order/orderOption/order_option';
import OrderDetail from '../pages/order/orderDetail/order_detail';
import OrderReport from '../pages/order/orderReport/order_report';
import PickupHome from '../pages/pickup/pickupHome/pickup_home';
import PickupStore from '../pages/pickup/pickupStore/pickup_store';
import PickupMyPickup from '../pages/pickup/pickupMyPickup/pickup_my_pickup';
import OrderHistory from '../pages/settings/orderHistory/order_history';
import IncomeCalculate from '../pages/settings/incomeCalculate/income_calculate';
import PickupDetail from '../pages/pickup/pickupDetail/pickup_detail';
import PickupProcessing from '../pages/pickup/pickupProcessing/pickup_processing';

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
            </Route>
            <Route path="/setting">
              <Route index element={<Setting />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="passwd" element={<ChangePassword />} />
              <Route path="order_history" element={<OrderHistory />} />
              <Route path="income_calculate" element={<IncomeCalculate />} />
            </Route>

            <Route path="/order">
              <Route index element={<OrderHome />} />
              <Route path="store" element={<OrderStore />} />
              <Route path="cart" element={<OrderCart />} />
              <Route path="payment" element={<OrderPayment />} />
              <Route path="confirm" element={<OrderConfirm />} />
              <Route path="waitings" element={<OrderWaitings />} />
              <Route path="option" element={<OrderOption />} />
              <Route path="detail" element={<OrderDetail />} />
              <Route path="report" element={<OrderReport />} />
            </Route>

            <Route path="/pickup">
              <Route index element={<PickupHome />} />
              <Route path="store" element={<PickupStore />} />
              <Route path="mypickup" element={<PickupMyPickup />} />
              <Route path="detail" element={<PickupDetail />} />
              <Route path="processing" element={<PickupProcessing />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
