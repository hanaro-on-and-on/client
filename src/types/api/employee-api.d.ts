//근무지 수동 추가
type ManualWorkPlaceAdditionRequest = {
  customWorkPlaceNm: string; //근무지명
  payPerHour: long; //시급
};

type ManualWorkPlaceAdditionResponse = {
  customWorkPlaceId: number;
};

//서명 요청
type ConfirmWorks = {
  employeeId: number;
  workPlaceName: string;
  colorCodeType: string;
  ownerName: string;
};

type ConfirmReqResponse = {
  workPlacesInvitaionsGetResponseList: ConfirmWorks[];
};
