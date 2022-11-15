export const MakeOptionText = (icehot, shotCnt) => {
  const iceHotInfo = icehot === 'ice' ? 'ICE' : 'HOT';
  const shotInfo = shotCnt > 0 ? `, 샷 추가(+${500 * shotCnt}원)` : '';

  return `${iceHotInfo} ${shotInfo}`;
};

export const PrintPrice = (price) => {
  if (!!price === false) return 0;

  const priceStr = typeof price === 'number' ? price.toString() : price;
  const priceSize = priceStr.length;

  if (priceSize > 3) {
    return `
      ${priceStr.slice(0, priceSize - 3)},${priceStr.slice(priceSize - 3)}
      `;
  }
  return priceStr;
};
