/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderRecordCard from '../../../components/atoms/cards/orderRecordCard/order_record_card';
import DatePickerContainer from '../../../components/molecules/datePickercContainer/date_picker_container';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';

const OrderHistory = () => {
  const navigate = useNavigate();

  const { order_history } = useSelector((state) => state.order);
  const MoveBack = () => navigate('/setting');

  // 추후 커스텀 훅으로 교체

  return (
    <div className="col-sm-4 order-history">
      <Header title="주문 내역" handleClick={MoveBack} />

      <section className="date-picker-section">
        <FormTitle title="조회 기간" />
        <DatePickerContainer />
      </section>

      <section className="order-history-list-section">
        <ul>
          {order_history.map((el) => (
            <OrderRecordCard key={el.id} info={el} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OrderHistory;
