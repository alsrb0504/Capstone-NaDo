import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../components/atoms/buttons/btn/btn';
import OrderCompleteCard from '../../../components/atoms/cards/orderCompleteCard/order_complete_card';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import FillLineInput from '../../../components/atoms/inputs/fillLineInput/fill_line_input';
import PaymentReceipt from '../../../components/atoms/paymentReceipt/payment_receipt';
import StateBox from '../../../components/atoms/stateBox/state_box';
import StoreMapSection from '../../../components/molecules/storeMapSection/store_map_section';
import useMove from '../../../hooks/useMove';
import { CompleteOrder } from '../../../store/features/order';
import { SwalSuccess } from '../../../utils/swal';
import { ChangeTimeInfo } from '../../../utils/time';

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { HandleMove, MoveHome } = useMove();

  const MoveBack = () => HandleMove('/order/waitings');
  const MoveReport = () => HandleMove('/order/report');

  const { currentOrder } = useSelector((state) => state.order);
  const {
    orderStatus,
    address,
    addressDetail,
    message,
    store,
    priceInfo,
    orderTimeout,
    orderProducts,
    orderSequence,
  } = currentOrder;

  const TestComplete = () => {
    dispatch(CompleteOrder(orderSequence));

    const popupTimer = 1200;
    SwalSuccess('배달이 완료되었습니다.', popupTimer);

    setTimeout(() => {
      MoveHome();
    }, popupTimer);
  };

  return (
    <div className="col-sm-4 order-detail">
      <Header title="주문 상세" handleClick={MoveBack} />
      <StateBox state={orderStatus} />
      <div className="info">
        <section className="info-map-section">
          <FormTitle title="가게 위치" />
          <StoreMapSection locationLatLong={store} />
        </section>

        <section>
          <FormTitle title="주소" />
          <FillLineInput val={`${address} ${addressDetail}`} />
        </section>

        <section>
          <FormTitle title="요청 사항" />
          <FillLineInput val={`~ ${ChangeTimeInfo(orderTimeout)} 까지`} />

          <FillLineInput val={message} />
        </section>

        <section className="info-list-section">
          <FormTitle title="주문 목록" />
          {orderProducts.map((coffee) => (
            <OrderCompleteCard
              key={coffee.orderdetailsSequence}
              info={coffee}
            />
          ))}
        </section>

        <section>
          <PaymentReceipt price_info={priceInfo} />
        </section>
      </div>
      {orderStatus === 'delivered' && (
        <React.Fragment>
          <Btn text="배달 완료 확인" color="blue" handleClick={TestComplete} />
          <Btn text="신고하기" color="red" handleClick={MoveReport} />
        </React.Fragment>
      )}
      <Btn text="확인" handleClick={MoveBack} />
      {/* <Btn text="피커와 채팅하기" /> */}
    </div>
  );
};
export default OrderDetail;
