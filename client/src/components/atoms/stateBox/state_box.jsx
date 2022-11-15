import React from 'react';

const StateBox = ({ state }) => {
  const stateInfo = {
    ordered: {
      text: '수락 대기 중...',
      color: 'dark',
    },
    pickuped: {
      text: '배달 중...',
      color: 'dark',
    },
    delivered: {
      text: '배달 완료 요청',
      color: 'blue',
    },
  };

  return (
    <div className={`state-box state-box-${stateInfo[state].color}`}>
      <q>{stateInfo[state].text}</q>
    </div>
  );
};

export default StateBox;
