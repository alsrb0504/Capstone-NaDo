/* eslint-disable import/prefer-default-export */
export const ChangeTimeInfo = (timeInfo) => {
  const date = new Date(timeInfo);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour} : ${
    minute < 10 ? `0${minute}` : minute
  }`;
};
