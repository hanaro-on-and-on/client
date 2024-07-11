export const BankList: SelectionProp[] = [
  { text: '하나은행', value: 'HANA' },
  { text: '신한은행', value: 'SHIN_HAN' },
  { text: '국민은행', value: 'KUK_MIN' },
  { text: '우리은행', value: 'URI' },
  { text: 'IBK기업은행', value: 'IBK' },
  { text: '농협은행', value: 'NONG_HYEOP' },
  { text: '수협은행', value: 'SU_HYEOP' },
  { text: '부산은행', value: 'BUSAN' },
];

export const EmployeeMenuList: LinkData[] = [
  { idx: 0, title: '캘린더', url: '/calendar' },
  { idx: 1, title: '급여관리', url: '/part-time/payment' },
  { idx: 2, title: '마이페이지', url: '/my' },
  { idx: 3, title: '출퇴근', url: '/attendance' },
];
