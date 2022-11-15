/* eslint-disable import/prefer-default-export */
export const ChangeTimeInfo = (timeInfo) => {
  const date = new Date(timeInfo);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour} : ${
    minute < 10 ? `0${minute}` : minute
  }`;
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
