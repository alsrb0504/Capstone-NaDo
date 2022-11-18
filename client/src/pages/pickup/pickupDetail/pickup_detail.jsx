/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Btn from '../../../components/atoms/buttons/btn/btn';
import Header from '../../../components/atoms/headers/header/header';
import StateBox from '../../../components/atoms/stateBox/state_box';
import PickupInfoSection from '../../../components/molecules/pickupInfoSection/pickup_infoSection';
import { CancelPickup, CatchPickup } from '../../../store/features/pickup';

const PickupDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MoveBack = () => navigate('/pickup/store');

  const { isCatch, selectedOrder } = useSelector((state) => state.pickup);
  const { orderSequence, orderStatus } = selectedOrder;

  const AccessOrder = () => {
    // 아래 버튼에서 컷해서 아마 뜰 일이 없을 거 같긴 함.
    if (isCatch) {
      alert('이미 진행중인 주문이 있습니다.');
      return;
    }

    dispatch(CatchPickup(orderSequence));
    alert('픽업 성공!');
  };

  // const CancelOrder = () => {
  //   dispatch(CancelPickup(orderSequence));
  // };

  // const CompleteOrder = () => {
  //   alert('미구현, 음.. 여기서 배달 완료가 필요한가?');
  // };

  return (
    <div className="col-sm-4 pickup-detail">
      <Header title="픽업 주문 상세" handleClick={MoveBack} />
      {/* <StateBox state={isCatch ? orderStatus : 'catched'} /> */}

      <PickupInfoSection selectedOrder={selectedOrder} />

      {/* {isCatch && (
        <React.Fragment>
          <Btn text="취소하기" color="red" handleClick={CancelOrder} />
          <Btn text="배달 완료" handleClick={CompleteOrder} />
        </React.Fragment>
      )} */}

      {/* {!isCatch && <Btn text="픽업하기" handleClick={AccessOrder} />} */}
      {/* {!isCatch && <Btn text="픽업하기" handleClick={AccessOrder} />} */}
      <Btn text="픽업하기" handleClick={AccessOrder} />
      {/* {isCatch && <Btn text="확인" handleClick={MoveBack} />} */}
    </div>
  );
};
export default PickupDetail;
