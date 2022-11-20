export const ChangeTimeInfo = (timeInfo) => {
  // const date = new Date(timeInfo.split('.000Z')[0]);

  let date;

  if (timeInfo.includes('.000Z')) {
    date = new Date(timeInfo.split('.000Z')[0]);
  } else {
    // const date = new Date(timeInfo);
    date = new Date(timeInfo);
  }

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
  let date;

  if (timeInfo.includes('.000Z')) {
    date = new Date(timeInfo.split('.000Z')[0]);
  } else {
    // const date = new Date(timeInfo);
    date = new Date(timeInfo);
  }

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

export const GetCurrentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }`;
};

export function MakeDateFormat(orderTime) {
  const dateInfo = new Date();

  const yy = dateInfo.getFullYear();
  let mm = dateInfo.getMonth() + 1; // +1 해줘야 함.
  let dd = dateInfo.getDate();

  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;

  return `${yy}-${mm}-${dd} ${orderTime}`;
}

export const GetDefaultPeriod = () => {
  const date = new Date();
  const yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;

  return [`${yy}-${mm}-01`, `${yy}-${mm}-${dd}`];
};

export const MakeReportFormat = (timeInfo) => {
  const date = new Date(timeInfo);
  const yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;

  return `${yy}-${mm}-${dd}`;
};
