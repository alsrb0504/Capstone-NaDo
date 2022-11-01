/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Btn from '../../atoms/btn/btn';
import FormTitle from '../../atoms/formTitle/form_title';
import order_address from '../../../data/order_address';
import LineInput from '../../atoms/lineInput/line_input';
import LineInputContainer from '../lineInputContainer/line_input_container';

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const OnSubmit = (data) => {
    console.log(data);
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
          id="order-detail"
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
          {...register('order-time')}
          type="time"
        />

        <label id="order-request" className="payment-form-label">
          요청 사항
        </label>
        {/* 조건 추가해줄 것 */}
        <LineInputContainer
          desc="요청사항"
          id="order-request"
          register={register}
          errors={errors}
        />
      </section>

      <section className="payment-form-section payment-pay-section">
        <FormTitle title="결제 정보" />

        <div className="toss-api">토스 결제 정보</div>

        <div className="payment-receipt">
          <h4 className="receipt-title">최종 결제 금액</h4>
          <div className="receipt-info">
            <span>주문금액</span>
            <span>16,900원</span>
          </div>
          <div className="receipt-info">
            <span>배달팁</span>
            <span>1,000원</span>
          </div>
          <div className="receipt-info">
            <span>총 결제금액</span>
            <span>17,900원</span>
          </div>
        </div>
      </section>

      <Btn type="submit" text="17,000원 결제하기" />
    </form>
  );
};

export default PaymentForm;