import React from 'react';
import FillLineInput from '../../atoms/inputs/fillLineInput/fill_line_input';
import FormTitle from '../../atoms/formTitle/form_title';
import OrderCompleteCard from '../../atoms/orderCompleteCard/order_complete_card';
import PaymentReceipt from '../../atoms/paymentReceipt/payment_receipt';
import StoreMapSection from '../storeMapSection/store_map_section';

const PaymentConfirm = () => {
  const location = {
    lat: 37.3227651,
    long: 127.125166,
  };

  const data = {
    address: '경기 용인시 수지구 죽전로144번길 15-14',
    request_time: '14:30 까지',
    request_content: '조심히 배달해주세요',
    list: [
      {
        name: '아메리카노',
        options: ['샷 추가(+500원)'],
        cnt: 1,
        price: '3500',
      },
      {
        name: '녹차라떼',
        options: ['샷 추가(+500원)'],
        cnt: 1,
        price: '4900',
      },
    ],
    price_info: {
      order_price: 16000,
      delivery_fee: 1000,
      total_price: 17000,
    },
  };

  return (
    <div className="payment-confirm">
      <section className="payment-confirm-map-section">
        <FormTitle title="가게 위치" />

        <StoreMapSection locationLatLong={location} />
      </section>

      <section>
        <FormTitle title="주소" />
        <FillLineInput val={data.address} />
      </section>

      <section>
        <FormTitle title="요청 사항" />
        <FillLineInput val={data.request_time} />

        <FillLineInput val={data.request_content} />
      </section>

      <section className="payment-confirm-list-section">
        <FormTitle title="주문 목록" />
        {data.list.map((coffee) => (
          <OrderCompleteCard info={coffee} />
        ))}
      </section>

      <section>
        <PaymentReceipt
          price_info={{
            order_price: 16000,
            delivery_fee: 1000,
            total_price: 17000,
          }}
        />
      </section>
    </div>
  );
};

export default PaymentConfirm;
