import React, { useCallback } from 'react';
import { PrintPrice } from '../../../../utils/text';
import { MakeFullTimeInfo } from '../../../../utils/time';

const PickupRecordCard = ({ info, HandleClick }) => {
  const { address, addressDetail, deliveredAt, orderSequence, deliveryFee } =
    info;

  const OnClick = useCallback(() => {
    HandleClick(orderSequence);
  }, [HandleClick, orderSequence]);

  return (
    <div className="card-container pickup-record-card" onClick={OnClick}>
      <div className="info">
        <h3>
          {address} {addressDetail}
        </h3>
        <p className="date">배달 일시 : {MakeFullTimeInfo(deliveredAt)}</p>
        <p>
          <span className="deliver">배달료 :{PrintPrice(deliveryFee)} 원</span>
        </p>
      </div>

      <i className="fa-solid fa-chevron-right" />
    </div>
  );
};

export default PickupRecordCard;
