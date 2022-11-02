import React from 'react';

const PaymentReceipt = ({ price_info }) => {
  const { order_price, delivery_fee, total_price } = price_info;

  return (
    <div className="payment-receipt">
      <h4 className="receipt-title">최종 결제 금액</h4>
      <div className="receipt-info">
        <span>주문금액</span>
        <span>{order_price}원</span>
      </div>
      <div className="receipt-info">
        <span>배달팁</span>
        <span>{delivery_fee}원</span>
      </div>
      <div className="receipt-info">
        <span>총 결제금액</span>
        <span>{total_price}원</span>
      </div>
    </div>
  );
};

export default PaymentReceipt;
