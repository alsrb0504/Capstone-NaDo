import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../components/atoms/buttons/btn/btn';
import Header from '../../../components/atoms/headers/header/header';
import StateBox from '../../../components/atoms/stateBox/state_box';
import PickupInfoSection from '../../../components/molecules/pickupInfoSection/pickup_infoSection';
import useMove from '../../../hooks/useMove';
import {
  CancelPickup,
  CompletePickup,
  InitCancel,
  InitCurrentPickup,
} from '../../../store/features/pickup';
import { SwalError, SwalSuccess } from '../../../utils/swal';

const PickupProcessing = () => {
  const dispatch = useDispatch();
  const { MoveHome, MoveBack } = useMove();

  const { isCatch, isCancel, currentPickup } = useSelector(
    (state) => state.pickup,
  );
  const { pickupSequence, orderStatus } = currentPickup;

  const CancelOrder = () => {
    dispatch(CancelPickup(pickupSequence));
  };

  const CompleteOrder = () => {
    dispatch(CompletePickup(pickupSequence));
    SwalSuccess('배달 완료.');
  };

  useEffect(() => {
    const popupTimer = 1200;

    // 기본 상태 isCatch = true && isCancel = false
    // 취소 요청 성공
    if (!isCatch && isCancel) {
      SwalSuccess('취소되었습니다.', popupTimer);

      // 홈으로 화면 이동
      setTimeout(() => {
        MoveHome();
        dispatch(InitCurrentPickup());
      }, popupTimer);

      dispatch(InitCancel());

      setTimeout(() => {
        MoveHome();
      }, popupTimer);
    }

    // 취소 요청 실패
    if (isCatch && isCancel) {
      SwalError('수락 후 5분이 경과했습니다.\n 취소할 수 없습니다.');
      dispatch(InitCancel());
    }
  }, [isCatch, isCancel, dispatch, MoveHome]);

  return (
    <div className="col-sm-4 pickup-detail">
      <Header title="픽업 주문 상세" handleClick={MoveBack} />
      {isCatch && <StateBox state={orderStatus} />}

      <PickupInfoSection selectedOrder={currentPickup} />

      {orderStatus === 'pickuped' && (
        <React.Fragment>
          <Btn text="취소하기" color="red" handleClick={CancelOrder} />
          <Btn text="배달 완료" handleClick={CompleteOrder} />
        </React.Fragment>
      )}

      {orderStatus !== 'pickuped' && <Btn text="확인" handleClick={MoveHome} />}
    </div>
  );
};

export default PickupProcessing;
