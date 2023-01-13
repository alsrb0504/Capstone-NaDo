import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderRecordCard from '../../../components/atoms/cards/orderRecordCard/order_record_card';
import DatePickerContainer from '../../../components/molecules/datePickercContainer/date_picker_container';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import { GetOrderReport } from '../../../store/features/order';
import { GetDefaultPeriod } from '../../../utils/time';
import EmptyState from '../../../components/atoms/emptyState/empty_state';
import useMove from '../../../hooks/useMove';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

  const { order_history } = useSelector((state) => state.order);
  const MoveBack = () => HandleMove('/setting');

  const InquireReport = (start, end) => {
    dispatch(GetOrderReport({ start, end }));
  };

  useEffect(() => {
    const [start, end] = GetDefaultPeriod();
    dispatch(GetOrderReport({ start, end }));
  }, [dispatch]);

  return (
    <div className="col-sm-4 order-history">
      <Header title="주문 내역" handleClick={MoveBack} />

      <section className="date-picker-section">
        <FormTitle title="조회 기간" />
        <DatePickerContainer InquireReport={InquireReport} />
      </section>

      {/* 주문내역이 없을 경우, 주문내역 없음 출력, 장바구니와 동일 */}
      {order_history.length === 0 && <EmptyState text="주문내역이 없습니다." />}

      {/* 주문내역이 있는 경우, 주문내역 출력 */}
      {order_history.length !== 0 && (
        <section className="order-history-list-section">
          <ul>
            {order_history.map((el) => (
              <OrderRecordCard key={el.orderSequence} info={el} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default OrderHistory;
