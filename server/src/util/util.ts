export function addHours(numOfHours, date = new Date()) {
  let copyDate = new Date(date)
  copyDate.setTime(copyDate.getTime() + numOfHours * 60 * 60 * 1000);

  return copyDate;
}