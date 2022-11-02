import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';

// eslint-disable-next-line arrow-body-style
const OrderCart = () => {
  const navigate = useNavigate();

  const { cartLists } = useSelector((state) => state.order);

  // 추후 가게 화면 또는 가게 리스트 화면 중 하나로 이동하도록
  const MoveBack = () => {
    navigate('/order');
  };

  return (
    <div className="col-sm-4 order-cart">
      <Header title="장바구니" handleClick={MoveBack} />
      {cartLists.length === 0 && (
        <section className="order-cart-empty-section">
          <div className="cart-empty-container">
            <img className="coffee-img" src="/images/coffee.svg" alt="" />
          </div>
          <p className="empty-text">장바구니가 비었습니다.</p>
        </section>
      )}
      {/* 장바구니 차 있을 경우, 컴포넌트 구현해야 함. */}
      {cartLists.length !== 0 && <div>차있음</div>}
    </div>
  );
};

export default OrderCart;
