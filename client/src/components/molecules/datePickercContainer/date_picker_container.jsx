/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import Btn from '../../atoms/buttons/btn/btn';
import { MakeReportFormat } from '../../../utils/time';

const DatePickerContainer = ({ InquireReport }) => {
  // 현재달 1일
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(1)));
  const [endDate, setEndDate] = useState(new Date());

  const OnSubmit = () => {
    InquireReport(MakeReportFormat(startDate), MakeReportFormat(endDate));
  };

  return (
    <div className="date-picker-section">
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
      <Btn text="조회" handleClick={OnSubmit} />
    </div>
  );
};

export default DatePickerContainer;
