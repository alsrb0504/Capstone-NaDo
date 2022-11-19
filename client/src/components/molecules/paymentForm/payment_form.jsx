/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Btn from '../../atoms/buttons/btn/btn';
import FormTitle from '../../atoms/formTitle/form_title';
import order_address from '../../../data/order_address';
import LineInputContainer from '../lineInputContainer/line_input_container';
import PaymentReceipt from '../../atoms/paymentReceipt/payment_receipt';
import { PrintPrice } from '../../../utils/text';
import { GetCurrentTime } from '../../../utils/time';

const PaymentForm = ({ SubmitPayment }) => {
  const { totalPrice } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const MoveHome = () => navigate('/');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: '도서관',
      order_detail: '',
      order_request: '조심히 와주세요.',
      order_time: GetCurrentTime(),
    },
  });

  const OnSubmit = (data) => {
    SubmitPayment(data);

    const popupTimer = 1200;

    // alert 추가
    Swal.fire({
      title: '결제 완료!',
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
  };

  const deliveryFee = 1200;
  const amountOfPayment = totalPrice + deliveryFee;

  return (
    <form className="payment-form" onSubmit={handleSubmit(OnSubmit)}>
      <section className="payment-form-section payment-address-section">
        <FormTitle title="주소" />

        <label id="address" className="payment-form-label">
          배달 주소
        </label>

        <select className="payment-form-select" {...register('address')}>
          {order_address.map((address) => (
            <option key={address.id} value={address.name}>
              {address.name}
            </option>
          ))}
        </select>

        {/* 조건 추가해줄 것 */}
        <LineInputContainer
          desc="상세주소"
          id="order_detail"
          register={register}
          errors={errors}
        />
      </section>

      <section className="payment-form-section payment-request-section">
        <FormTitle title="요청 사항" />

        <label id="order-time" className="payment-form-label">
          주문 시간
        </label>
        <input
          className="order-time-input"
          {...register('order_time')}
          type="time"
          disabled
        />

        <label id="order-request" className="payment-form-label">
          요청 사항
        </label>
        {/* 조건 추가해줄 것 */}
        <LineInputContainer
          desc="요청사항"
          id="order_request"
          register={register}
          errors={errors}
        />
      </section>

      <section className="payment-form-section payment-pay-section">
        <FormTitle title="결제 정보" />

        <div className="toss-api">토스 결제 정보</div>

        <PaymentReceipt
          price_info={{
            menuPrice: totalPrice,
            deliveryFee,
            amountOfPayment,
          }}
        />
      </section>

      <Btn type="submit" text={`${PrintPrice(amountOfPayment)}원 결제하기`} />
    </form>
  );
};

export default PaymentForm;
