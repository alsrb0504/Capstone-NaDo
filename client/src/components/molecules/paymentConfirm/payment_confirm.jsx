import React from 'react';
import FillLineInput from '../../atoms/inputs/fillLineInput/fill_line_input';
import FormTitle from '../../atoms/formTitle/form_title';
import OrderCompleteCard from '../../atoms/cards/orderCompleteCard/order_complete_card';
import PaymentReceipt from '../../atoms/paymentReceipt/payment_receipt';
import StoreMapSection from '../storeMapSection/store_map_section';

const PaymentConfirm = ({ orderInfo }) => {
  const location = orderInfo.store;
  const {
    address,
    addressDetail,
    orderTimeout,
    message,
    priceInfo,
    orderProducts,
  } = orderInfo;
  const { deliveryFee, menuPrice, amountOfPayment } = priceInfo;

  return (
    <div className="payment-confirm">
      <section className="payment-confirm-map-section">
        <FormTitle title="가게 위치" />

        <StoreMapSection locationLatLong={location} />
      </section>

      <section>
        <FormTitle title="주소" />
        <FillLineInput val={`${address} ${addressDetail}`} />
      </section>

      <section>
        <FormTitle title="요청 사항" />
        <FillLineInput val={orderTimeout} />

        <FillLineInput val={message} />
      </section>

      <section className="payment-confirm-list-section">
        <FormTitle title="주문 목록" />
        {orderProducts.map((coffee) => (
          <OrderCompleteCard info={coffee} />
        ))}
      </section>

      <section>
        <PaymentReceipt
          price_info={{
            order_price: menuPrice,
            delivery_fee: deliveryFee,
            total_price: amountOfPayment,
          }}
        />
      </section>
    </div>
  );
};

export default PaymentConfirm;
