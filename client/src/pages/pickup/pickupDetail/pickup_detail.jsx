/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Btn from '../../../components/atoms/buttons/btn/btn';
import Header from '../../../components/atoms/headers/header/header';
import StateBox from '../../../components/atoms/stateBox/state_box';
import PickupInfoSection from '../../../components/molecules/pickupInfoSection/pickup_infoSection';
import { CancelPickup, CatchPickup } from '../../../store/features/pickup';

const PickupDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MoveHome = () => navigate('/');
  const MoveBack = () => navigate('/pickup/store');

  const { isCatch, selectedOrder } = useSelector((state) => state.pickup);
  const { orderSequence, orderStatus } = selectedOrder;

  const AccessOrder = () => {
    const popupTimer = 1200;

    // 아래 버튼에서 컷해서 아마 뜰 일이 없을 거 같긴 함.
    if (isCatch) {
      Swal.fire({
        title: '이미 진행중인 주문이 있습니다.',
        text: '',
        icon: 'error',
        showConfirmButton: false,

        timer: popupTimer,
      });
      return;
    }

    dispatch(CatchPickup(orderSequence));

    Swal.fire({
      title: '주문 수락!',
      text: '',
      icon: 'success',
      showConfirmButton: false,

      timer: popupTimer,
    });
    // 홈으로 화면 이동
    setTimeout(() => {
      MoveHome();
    }, popupTimer);
  };

  return (
    <div className="col-sm-4 pickup-detail">
      <Header title="픽업 주문 상세" handleClick={MoveBack} />
      {/* <StateBox state={isCatch ? 'ordered' : 'catched'} /> */}

      <PickupInfoSection selectedOrder={selectedOrder} />

      {isCatch && <Btn text="확인" handleClick={MoveBack} />}
      {!isCatch && <Btn text="픽업하기" handleClick={AccessOrder} />}
    </div>
  );
};
export default PickupDetail;
