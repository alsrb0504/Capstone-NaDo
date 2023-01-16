import React from 'react';
import { PrintPrice } from '../../../utils/text';
import { ChangeTimeInfo } from '../../../utils/time';
import OrderCompleteCard from '../../atoms/cards/orderCompleteCard/order_complete_card';
import FormTitle from '../../atoms/formTitle/form_title';
import FillLineInput from '../../atoms/inputs/fillLineInput/fill_line_input';
import PriceBox from '../../atoms/priceBox/price_box';
import StoreMapSection from '../storeMapSection/store_map_section';

const PickupInfoSection = ({ selectedOrder }) => {
  const {
    address,
    addressDetail,
    message,
    store,
    priceInfo,
    orderTimeout,
    orderProducts,
  } = selectedOrder;
  const { deliveryFee, amountOfPayment } = priceInfo;

  return (
    <div className="info">
      <section className="info-map-section">
        <FormTitle title="배달 위치" />
        <StoreMapSection locationLatLong={store} />
      </section>

      <section>
        <FormTitle title="주소" />
        <FillLineInput val={`${address} ${addressDetail}`} />
      </section>

      <section>
        <FormTitle title="요청 사항" />
        <FillLineInput val={`~ ${ChangeTimeInfo(orderTimeout)} 까지`} />

        <FillLineInput val={message} />
      </section>

      <section className="info-list-section">
        <FormTitle title="주문 목록" />
        {orderProducts.map((coffee) => (
          <OrderCompleteCard key={coffee.orderdetailsSequence} info={coffee} />
        ))}
      </section>

      <PriceBox text="배달팁" color="배달" price={PrintPrice(deliveryFee)} />
      <PriceBox text="주문금액" price={PrintPrice(amountOfPayment)} />
    </div>
  );
};

export default PickupInfoSection;
