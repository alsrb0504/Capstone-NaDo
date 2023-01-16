/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../components/atoms/buttons/btn/btn';
import Header from '../../../components/atoms/headers/header/header';
import PickupInfoSection from '../../../components/molecules/pickupInfoSection/pickup_infoSection';
import useMove from '../../../hooks/useMove';
import { CatchPickup } from '../../../store/features/pickup';
import { SwalSuccess, SwalError } from '../../../utils/swal';

const PickupDetail = () => {
  const dispatch = useDispatch();
  const { MoveHome, MoveBack } = useMove();

  const { isCatch, selectedOrder } = useSelector((state) => state.pickup);
  const { orderSequence, orderStatus } = selectedOrder;

  const AccessOrder = () => {
    const popupTimer = 1200;

    // 아래 버튼에서 컷해서 아마 뜰 일이 없을 거 같긴 함.
    if (isCatch) {
      SwalError('이미 진행중인 주문이 있습니다.', popupTimer);
      return;
    }

    dispatch(CatchPickup(orderSequence));
    SwalSuccess('주문 수락', popupTimer);

    // 홈으로 화면 이동
    setTimeout(() => {
      MoveHome();
    }, popupTimer);
  };

  return (
    <div className="col-sm-4 pickup-detail">
      <Header title="픽업 주문 상세" HandleClick={MoveBack} />
      <PickupInfoSection selectedOrder={selectedOrder} />

      {isCatch && <Btn text="확인" HandleClick={MoveBack} />}
      {!isCatch && <Btn text="픽업하기" HandleClick={AccessOrder} />}
    </div>
  );
};
export default PickupDetail;
