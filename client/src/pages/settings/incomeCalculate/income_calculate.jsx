import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PickupRecordCard from '../../../components/atoms/cards/pickuprecordCard/pickup_record_card';
import EmptyState from '../../../components/atoms/emptyState/empty_state';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import DatePickerContainer from '../../../components/molecules/datePickercContainer/date_picker_container';
import useMove from '../../../hooks/useMove';
import { GetPickupReport } from '../../../store/features/pickup';
import { PrintPrice } from '../../../utils/text';
import { GetDefaultPeriod } from '../../../utils/time';

const IncomeCalculate = () => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

  const { pickupHistory } = useSelector((state) => state.pickup);
  const { profitList, totalProfit } = pickupHistory;

  const MoveBack = () => HandleMove('/setting');

  const InquireReport = (start, end) => {
    dispatch(GetPickupReport({ start, end }));
  };

  useEffect(() => {
    const [start, end] = GetDefaultPeriod();
    dispatch(GetPickupReport({ start, end }));
  }, [dispatch]);

  return (
    <div className="col-sm-4 income-calculate">
      <Header title="픽업 내역" handleClick={MoveBack} />

      <section className="date-picker-section">
        <FormTitle title="조회 기간" />
        <DatePickerContainer InquireReport={InquireReport} />
      </section>

      <div className="income-calculate-total">
        <p>총 수익</p>

        <p>{PrintPrice(totalProfit)}원</p>
      </div>

      {/* 픽업내역이 없을 경우, 픽업내역 없음 출력, 장바구니와 동일 */}
      {profitList.length === 0 && <EmptyState text="픽업내역이 없습니다." />}

      {/* 픽업내역이 있는 경우, 픽업내역 출력 */}
      {profitList.length !== 0 && (
        <section className="income-history-list-section">
          <ul>
            {profitList.map((el) => (
              <PickupRecordCard key={el.orderSequence} info={el} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default IncomeCalculate;
