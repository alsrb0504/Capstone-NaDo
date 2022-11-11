/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import Btn from '../../atoms/buttons/btn/btn';
import FormTitle from '../../atoms/formTitle/form_title';
import order_address from '../../../data/order_address';
import LineInputContainer from '../lineInputContainer/line_input_container';
import PaymentReceipt from '../../atoms/paymentReceipt/payment_receipt';

const PaymentForm = ({ SubmitPayment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const OnSubmit = (data) => {
    // console.log(data);
    SubmitPayment(data);
  };

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
          배달 시간
        </label>
        <input
          className="order-time-input"
          {...register('order_time')}
          type="time"
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
            order_price: 16000,
            delivery_fee: 1000,
            total_price: 17000,
          }}
        />
      </section>

      <Btn type="submit" text="17,000원 결제하기" />
    </form>
  );
};

export default PaymentForm;
