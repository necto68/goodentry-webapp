export const getDurationBetweenTimestamps = (
  fromTimestamp: number,
  toTimestamp: number
) => {
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;

  const diff = toTimestamp - fromTimestamp;
  let remainder = Math.floor(diff / 1000);

  const days = Math.floor(remainder / secondsInDay);
  remainder %= secondsInDay;

  const hours = Math.floor(remainder / secondsInHour);
  remainder %= secondsInHour;

  const minutes = Math.floor(remainder / secondsInMinute);
  remainder %= secondsInMinute;

  const seconds = remainder;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
