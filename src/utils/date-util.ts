const parseYYYMMDD = (dateString: string): Date => {
  // 문자열에서 연도, 월, 일을 추출합니다.
  const year = parseInt(dateString.substring(0, 4), 10); // 앞의 4자리: 연도
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // 중간 2자리: 월 (0부터 시작하므로 -1)
  const day = parseInt(dateString.substring(6, 8), 10); // 마지막 2자리: 일

  // Date 객체를 생성합니다.
  return new Date(year, month, day);
};
export default parseYYYMMDD;
