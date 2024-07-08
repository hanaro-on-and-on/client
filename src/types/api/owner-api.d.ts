//사장님 - 대표계좌 등록
type OwnerAddMainAccountRequest = {
  ownerNm: string;
  accountNumber: string;
};

type OwnerAddMainAccountResponse = {
  ownerId: number;
};
