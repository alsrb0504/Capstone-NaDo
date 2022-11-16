import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Btn from '../../../components/atoms/buttons/btn/btn';
import OrderCompleteCard from '../../../components/atoms/cards/orderCompleteCard/order_complete_card';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import FillLineInput from '../../../components/atoms/inputs/fillLineInput/fill_line_input';
import PaymentReceipt from '../../../components/atoms/paymentReceipt/payment_receipt';
import StateBox from '../../../components/atoms/stateBox/state_box';
import StoreMapSection from '../../../components/molecules/storeMapSection/store_map_section';
import { ChangeTimeInfo } from '../../../utils/time';

const OrderDetail = () => {
  const navigate = useNavigate();

  const MoveBack = () => navigate('/order/waitings');
  const MoveReport = () => navigate('/order/report');

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
  } = currentOrder;

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
      <Btn text="배달 완료 확인" color="blue" />
      <Btn text="피커와 채팅하기" />
      <Btn text="신고하기" color="red" handleClick={MoveReport} />
    </div>
  );
};
export default OrderDetail;
