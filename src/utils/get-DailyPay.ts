const calculateDailyWage = (
  startTime: string,
  endTime: string,
  payPerHour: number
) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  // 초 부분 단위 0으로 설정하여 무효화
  start.setSeconds(0, 0);
  end.setSeconds(0, 0);

  // 근무 시간을 밀리초 단위로 계산한다.
  const millisecondsWorked = end.getTime() - start.getTime();

  // 밀리초를 분 단위로 변환한다.
  const minutesWorked = millisecondsWorked / 1000 / 60;

  // 분당 시급 계산
  const payPerMinute = payPerHour / 60;

  // 일당을 계산한다.
  const dailyWage = minutesWorked * payPerMinute;

  return dailyWage.toLocaleString();
};

export default calculateDailyWage;
