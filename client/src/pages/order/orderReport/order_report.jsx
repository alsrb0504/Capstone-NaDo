import React from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Btn from '../../../components/atoms/buttons/btn/btn';
import FormTitle from '../../../components/atoms/formTitle/form_title';
import Header from '../../../components/atoms/headers/header/header';
import LineInputContainer from '../../../components/molecules/lineInputContainer/line_input_container';
import OrderRecordCard from '../../../components/atoms/cards/orderRecordCard/order_record_card';
import { MakeFullTimeInfo } from '../../../utils/time';

const OrderReport = () => {
  const { currentOrder } = useSelector((state) => state.order);
  const { address, addressDetail, orderTimeout, priceInfo } = currentOrder;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = (info) => {
    handleAlert();
    console.log(info);
  };

  const navigate = useNavigate();

  const MoveBack = () => navigate('/order/detail');
  const MoveOrder = () => navigate('/order/detail');
  const MoveHome = () => navigate('/');

  const handleAlert = () => {
    Swal.fire({
      title: '정말 신고 하시겠습니까?',
      text: '접수된 신고는 취소할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '아니요',
      confirmButtonColor: '#43a2ff',
      cancelButtonColor: '#f47272',
      confirmButtonText: '네, 신고하겠습니다.',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '신고 완료!',
          text: '',
          icon: 'success',
          // confirmButtonColor: '#43a2ff',
          showConfirmButton: false,
          timer: 1200,
        });
        MoveHome();
      }
    });
  };

  return (
    <div className="col-sm-4 order-report">
      <Header title="신고하기" handleClick={MoveBack} />
      <div className="order-report-body">
        <section className="order-section">
          <FormTitle title="신고 주문" />
          <OrderRecordCard
            info={{
              orderAddress: `${address} ${addressDetail}`,
              orderTime: MakeFullTimeInfo(orderTimeout),
              orderPrice: priceInfo.amountOfPayment,
            }}
            handleClick={MoveOrder}
          />
        </section>

        <form className="report-form" onSubmit={handleSubmit(OnSubmit)}>
          <FormTitle title="신고내용" />
          <LineInputContainer
            desc="신고내용을 작성해주세요"
            id="report-info"
            register={register}
            errors={errors}
          />
          <div className="btn-complete">
            <Btn
              type="submit"
              text="신고하기"
              color="red"
              handleClick={MoveBack}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default OrderReport;
