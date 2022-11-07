import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PickupRecordCard from '../../../components/atoms/cards/pickuprecordCard/pickup_record_card';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import DatePickerContainer from '../../../components/molecules/datePickercContainer/date_picker_container';

const IncomeCalculate = () => {
  const navigate = useNavigate();

  const { pickup_history } = useSelector((state) => state.pickup);

  // 추후 계산하는 함수 만들 것.
  const totalIncome = 36000;

  const MoveBack = () => navigate('/setting');

  return (
    <div className="col-sm-4 income-calculate">
      <Header title="주문 내역" handleClick={MoveBack} />

      <section className="date-picker-section">
        <FormTitle title="조회 기간" />
        <DatePickerContainer />
      </section>

      <div className="income-calculate-total">
        <p>총 수익</p>

        <p>{totalIncome}원</p>
      </div>

      <section className="income-history-list-section">
        <ul>
          {pickup_history.map((el) => (
            <PickupRecordCard key={el.pickupId} info={el} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default IncomeCalculate;
