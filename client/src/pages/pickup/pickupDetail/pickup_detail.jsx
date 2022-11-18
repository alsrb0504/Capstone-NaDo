/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Btn from '../../../components/atoms/buttons/btn/btn';
import OrderCompleteCard from '../../../components/atoms/cards/orderCompleteCard/order_complete_card';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import FillLineInput from '../../../components/atoms/inputs/fillLineInput/fill_line_input';
import PriceBox from '../../../components/atoms/priceBox/price_box';
import StateBox from '../../../components/atoms/stateBox/state_box';
import StoreMapSection from '../../../components/molecules/storeMapSection/store_map_section';
import { CancelPickup, CatchPickup } from '../../../store/features/pickup';
import { PrintPrice } from '../../../utils/text';
import { ChangeTimeInfo } from '../../../utils/time';

const PickupDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MoveBack = () => navigate('/pickup/store');

  const { isCatch, selectedOrder } = useSelector((state) => state.pickup);
  const {
    address,
    addressDetail,
    message,
    store,
    priceInfo,
    orderTimeout,
    orderProducts,
    orderSequence,
  } = selectedOrder;

  const { deliveryFee, amountOfPayment } = priceInfo;

  const AccessOrder = () => {
    if (isCatch) {
      alert('이미 진행중인 주문이 있습니다.');
      return;
    }

    dispatch(CatchPickup(orderSequence));
  };

  const CancelOrder = () => {
    dispatch(CancelPickup(orderSequence));
  };

  const CompleteOrder = () => {
    alert('미구현, 음.. 여기서 배달 완료가 필요한가?');
  };

  return (
    <div className="col-sm-4 pickup-detail">
      <Header title="픽업 주문 상세" handleClick={MoveBack} />
      {isCatch && <StateBox state="catched" />}
      <div className="info">
        <section className="info-map-section">
          <FormTitle title="배달 위치" />
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

        <PriceBox text="주문금액" price={PrintPrice(amountOfPayment)} />

        <PriceBox text="배달팁" color="배달" price={PrintPrice(deliveryFee)} />
      </div>

      {isCatch && (
        <React.Fragment>
          <Btn text="취소하기" color="red" handleClick={CancelOrder} />
          <Btn text="배달 완료" handleClick={CompleteOrder} />
        </React.Fragment>
      )}

      {!isCatch && <Btn text="픽업하기" handleClick={AccessOrder} />}
    </div>
  );
};
export default PickupDetail;
