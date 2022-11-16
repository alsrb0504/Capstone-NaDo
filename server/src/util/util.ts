export function addHours(numOfHours, date = new Date()) {
  let copyDate = new Date(date)
  copyDate.setTime(copyDate.getTime() + numOfHours * 60 * 60 * 1000);

  return copyDate;
}

export function getCurrentTime() {
  const currentTime = new Date()
  const curr = currentTime.getTime()
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000
  const kr_curr = new Date(curr + (KR_TIME_DIFF))

  return kr_curr
}