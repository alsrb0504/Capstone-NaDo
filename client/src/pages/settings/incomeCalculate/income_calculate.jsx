import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PickupRecordCard from '../../../components/atoms/cards/pickuprecordCard/pickup_record_card';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import DatePickerContainer from '../../../components/molecules/datePickercContainer/date_picker_container';
import { GetPickupReport } from '../../../store/features/pickup';
import { PrintPrice } from '../../../utils/text';
import { GetDefaultPeriod } from '../../../utils/time';

const IncomeCalculate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pickupHistory } = useSelector((state) => state.pickup);
  const { profitList, totalProfit } = pickupHistory;

  const MoveBack = () => navigate('/setting');

  const InquireReport = (start, end) => {
    dispatch(GetPickupReport({ start, end }));
  };

  useEffect(() => {
    const [start, end] = GetDefaultPeriod();
    dispatch(GetPickupReport({ start, end }));
  }, [dispatch]);

  return (
    <div className="col-sm-4 income-calculate">
      <Header title="주문 내역" handleClick={MoveBack} />

      <section className="date-picker-section">
        <FormTitle title="조회 기간" />
        <DatePickerContainer InquireReport={InquireReport} />
      </section>

      <div className="income-calculate-total">
        <p>총 수익</p>

        <p>{PrintPrice(totalProfit)}원</p>
      </div>

      <section className="income-history-list-section">
        <ul>
          {profitList.map((el) => (
            <PickupRecordCard key={el.orderSequence} info={el} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default IncomeCalculate;
