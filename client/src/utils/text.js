/* eslint-disable import/prefer-default-export */
export const MakeOptionText = (icehot, shotCnt) => {
  const iceHotInfo = icehot === 'ice' ? 'ICE' : 'HOT';
  const shotInfo = shotCnt > 0 ? `, 샷 추가(+${500 * shotCnt}원)` : '';

  return `${iceHotInfo} ${shotInfo}`;
};
