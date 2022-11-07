/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

const DatePickerContainer = () => {
  // const startDateString = new Date(new Date().setDate(1));

  // 현재달 1일
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(1)));
  const [endDate, setEndDate] = useState(new Date());

  // 조회 버튼..

  return (
    <div className="date-picker-container">
      <DatePicker
        wrapperClassName="datePicker"
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        locale={ko}
        maxDate={new Date()}
        closeOnScroll
        onChange={(selectedDate) => setStartDate(selectedDate)}
      />
      <span className="date-picker-split">~</span>
      <DatePicker
        wrapperClassName="datePicker"
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        locale={ko}
        maxDate={new Date()}
        closeOnScroll
        onChange={(selectedDate) => setEndDate(selectedDate)}
      />
    </div>
  );
};

export default DatePickerContainer;
