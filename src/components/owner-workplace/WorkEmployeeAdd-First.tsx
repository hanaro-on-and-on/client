import { ChangeEvent, useState } from 'react';
import { useEmployeeContract } from '../../contexts/EmployeeContract-Context';
import InputBox from '../ui/InputBox';
import { Spacer, VStack } from '../ui/Stack';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import ThreeLevelUi from '../ui/ThreeLevelUi';
import { useNavigate, useParams } from 'react-router-dom';

const phonePattern = /^01[016789]-?\d{3,4}-?\d{4}$/;

const validFactory = (valid: 'NAME' | 'ADDRESS' | 'PHONE') => {
  switch (valid) {
    case 'NAME':
      return '이름을 바르게 입력해주세요.';
    case 'PHONE':
      return '전화번호를 바르게 입력해주세요.';
    case 'ADDRESS':
      return '주소를 바르게 입력해주세요.';
    default:
      return '문제가 발생했어요. 다시 시도해주세요';
  }
};

const WorkEmployeeAddFirst = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const { employeeContract, addFirstInfo, setFirstInfo } =
    useEmployeeContract();

  const [employeeNm, setEmployeeName] = useState<string>(
    employeeContract?.employeeNm ? employeeContract.employeeNm : ''
  );
  const [employeeAddress, setEmployeeAddress] = useState<string>(
    employeeContract?.employeeAddress ? employeeContract.employeeAddress : ''
  );
  const [employeePhone, setEmployeePhone] = useState<string>(
    employeeContract?.employeePhone ? employeeContract.employeePhone : ''
  );
  const [valid, setValid] = useState<string>('');

  const onChangeEmployeeName = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(e.target.value);
  };
  const onChangeEmployeeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeAddress(e.target.value);
  };
  const onChangeEmployeePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeePhone(e.target.value);
  };

  const onClickAddFirst = () => {
    if (!employeeNm) {
      setValid(validFactory('NAME'));
      return;
    }
    if (!employeePhone || !phonePattern.test(employeePhone)) {
      setValid(validFactory('PHONE'));
      return;
    }
    if (!employeeAddress) {
      setValid(validFactory('ADDRESS'));
      return;
    }

    addFirstInfo({ employeeNm, employeeAddress, employeePhone });
    setFirstInfo({ employeeNm, employeeAddress, employeePhone });
    navigate(`/owner/myWorkPlaces/${placeId}/addEmployee/second`);
  };

  return (
    <VStack className='p-6 h-full'>
      <VStack className='gap-6'>
        <div className='text-2xl font-semibold'>
          {employeeContract?.workPlaceNm}
        </div>

        <ThreeLevelUi level={1} />

        <InputBox
          label='이름'
          value={employeeNm}
          onChange={onChangeEmployeeName}
          placeholder='이름을 바르게 입력해주세요.'
        />
        <InputBox
          label='전화번호'
          value={employeePhone}
          onChange={onChangeEmployeePhone}
          placeholder='전화번호를 바르게 입력해주세요.'
        />
        <InputBox
          label='주소'
          value={employeeAddress}
          onChange={onChangeEmployeeAddress}
          placeholder='주소를 바르게 입력해주세요.'
        />
      </VStack>

      {valid && <div className='p-6 text-red-400 font-light'>{valid}</div>}

      <Spacer />
      <div className='py-6'>
        <BtnChoiceBox
          actionName={'다음'}
          closeName={'취소'}
          onAction={onClickAddFirst}
          onClose={() => history.back()}
        />
      </div>
    </VStack>
  );
};
export default WorkEmployeeAddFirst;
