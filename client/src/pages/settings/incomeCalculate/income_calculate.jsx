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
      <Header title="픽업 내역" handleClick={MoveBack} />

      <section className="date-picker-section">
        <FormTitle title="조회 기간" />
        <DatePickerContainer />
      </section>

      <div className="income-calculate-total">
        <p>총 수익</p>

        {/* 픽업내역이 없을 경우, 수익 0원 */}
        {pickup_history.length === 0 && (
          <p>0원</p>
        )}

        {/* 픽업내역이 있을 경우, 수익 계산 */}
        {pickup_history.length !== 0 && (
          <p>{totalIncome}원</p>
        )}

      </div>

      {/* 픽업내역이 없을 경우, 픽업내역 없음 출력, 장바구니와 동일 */}
      {pickup_history.length === 0 && (
        <section className="order-cart-empty-section">
          <div className="cart-empty-container">
            <img className="coffee-img" src="/images/coffee.svg" alt="" />
          </div>
          <p className="empty-text">픽업내역이 없습니다.</p>
        </section>
      )}

      {/* 픽업내역이 있는 경우, 픽업내역 출력 */}
      {pickup_history.length !== 0 && (
      <section className="income-history-list-section">
        <ul>
          {pickup_history.map((el) => (
            <PickupRecordCard key={el.pickupId} info={el} />
          ))}
        </ul>
      </section>
      )}

    </div>
  );
};

export default IncomeCalculate;
