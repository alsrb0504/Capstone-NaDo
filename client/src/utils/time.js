export const ChangeTimeInfo = (timeInfo) => {
  console.log(`timeInfo = ${timeInfo}`);

  const date = new Date(timeInfo);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour} : ${
    minute < 10 ? `0${minute}` : minute
  }`;
};

export const CalcOpenTime = (timeInfo) => {
  const date = new Date();
  const hour = date.getHours();

  // 예외 케이스 : 정보가 없는 경우.
  if (timeInfo === undefined || timeInfo.startTime === undefined) {
    if (hour < 10 || hour > 20) return false;
    return true;
  }

  const { startTime, endTime } = timeInfo;

  const openHour = startTime.split(':').map(Number)[0];
  const closeHour = endTime.split(':').map(Number)[0];

  if (hour < openHour || hour > closeHour) return false;
  return true;
};

export const MakeFullTimeInfo = (timeInfo) => {
  const date = new Date(timeInfo);

  const yy = date.getFullYear().toString().slice(2);
  let mm = date.getMonth() + 1; // +1 해줘야 함.
  let dd = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;
  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;

  return `${yy}.${mm}.${dd} ${hour} : ${minute}`;
};

export const MakeStoreOpenTime = (openTime) => {
  const { dayOfWeek, startTime, endTime } = openTime[0];

  if (dayOfWeek === '매') {
    return `매일 ${startTime || '10:00'} ~ ${endTime || '20:00'}`;
  }

  return `금일 ${startTime || '10:00'} ~ ${endTime || '20:00'}`;
};

// *
// 주문하기 시간 확인 함수.
// *
export const CheckOrderTime = (orderTime) => {
  console.log(`orderTime = ${orderTime}`);
  // const curTime = new Date();
  // const yy = curTime.getFullYear();
  // const mm = curTime.getMonth();
  // const dd = curTime.getDate();
  // const curH = curTime.getHours();

  // const [reqH, reqM] = orderTime.split(':').map(Number);

  // 서비스 영업 시간이 아님.
  // 추후 다시 살릴 것.!
  // if (curH < 8 || curH > 22 || reqH < 9 || reqH > 22) return false;

  // const reqTimeObj = new Date(yy, mm, dd, reqH, reqM);
  // const curTimeObj = new Date();

  // 시간차(분 단위) 계산.
  // const diff = (reqTimeObj.getTime() - curTimeObj.getTime()) / (1000 * 60);

  // 최소 60분 이상 최대 120분 이하 범위에서만 주문 가능.
  // if (diff < 60 || diff > 120) return false;

  return true;
};
