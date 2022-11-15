import React from 'react';
import { MakeStoreOpenTime } from '../../../utils/time';

const StoreInfoSection = ({ shopName, shopOpenTime, shopNumber }) => (
  <section className="shop-info">
    <h3 className="shop-info-name">{shopName}</h3>
    <span className="shop-info-title">가게 정보</span>
    <div className="shop-info-main">
      <div className="opening-info main-first-child">
        <p className="info-title">운영 시간</p>
        {/* 운영 시간은 나중에 수정 */}
        <p>{MakeStoreOpenTime(shopOpenTime)}</p>
      </div>

      <div className="contact-info">
        <p className="info-title">가게 번호</p>
        <p>{shopNumber !== '' ? shopNumber : '010-1111-1111'}</p>
      </div>
    </div>
  </section>
);

export default StoreInfoSection;
