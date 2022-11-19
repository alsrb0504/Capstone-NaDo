/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Btn from '../../../components/atoms/buttons/btn/btn';
import Header from '../../../components/atoms/headers/header/header';
import StateBox from '../../../components/atoms/stateBox/state_box';
import PickupInfoSection from '../../../components/molecules/pickupInfoSection/pickup_infoSection';
import {
  CancelPickup,
  CompletePickup,
  InitCancel,
} from '../../../store/features/pickup';

const PickupProcessing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MoveHome = () => navigate('/');
  const MoveBack = () => navigate('/pickup/myPickup');

  const { isCatch, isCancel, currentPickup } = useSelector(
    (state) => state.pickup,
  );
  const { pickupSequence, orderStatus } = currentPickup;

  console.log(currentPickup);
  console.log(pickupSequence, orderStatus);

  const CancelOrder = () => {
    dispatch(CancelPickup(pickupSequence));
  };

  const CompleteOrder = () => {
    dispatch(CompletePickup(pickupSequence));

    alert('픽업 완료');
  };

  useEffect(() => {
    const popupTimer = 1200;

    // 기본 상태 isCatch = true && isCancel = false
    // 취소 요청 성공
    if (!isCatch && isCancel) {
      Swal.fire({
        title: '취소되었습니다.',
        text: '',
        icon: 'success',
        // confirmButtonColor: '#43a2ff',
        showConfirmButton: false,

        timer: popupTimer,
      });
      // 홈으로 화면 이동
      setTimeout(() => {
        MoveHome();
      }, popupTimer);

      dispatch(InitCancel());

      setTimeout(() => {
        MoveHome();
      }, popupTimer);
    }

    // 취소 요청 실패
    if (isCatch && isCancel) {
      Swal.fire({
        title: '수락 후 5분이 경과했습니다. \n 취소할 수 없습니다.',
        text: '',
        icon: 'error',
        // confirmButtonColor: '#43a2ff',
        showConfirmButton: false,

        timer: popupTimer,
      });

      dispatch(InitCancel());
    }
  }, [isCatch, isCancel, dispatch, MoveHome]);

  return (
    <div className="col-sm-4 pickup-detail">
      <Header title="픽업 주문 상세" handleClick={MoveBack} />
      {isCatch && <StateBox state={orderStatus} />}

      <PickupInfoSection selectedOrder={currentPickup} />

      {/* {isCatch && ( */}
      <Btn text="취소하기" color="red" handleClick={CancelOrder} />
      <Btn text="배달 완료" handleClick={CompleteOrder} />
      {/* )} */}
    </div>
  );
};

export default PickupProcessing;
