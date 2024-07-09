import { ChangeEvent, useState } from 'react';
import { MINIMUM_PAY_PER_HOUR } from '../../utils/const-value';
import { HStack, Spacer, VStack } from '../ui/Stack';
import { DayOfWeekShort } from './WorkEmployeeAdd-Second';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import ThreeLevelUi from '../ui/ThreeLevelUi';
import { useEmployeeContract } from '../../contexts/EmployeeContract-Context';
import { set } from 'date-fns';
import { addSuffixDayOfWeek } from '../../utils/date-util';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api/apiClient';

enum Bonus {
  ON = 'bonusOn',
  OFF = 'bonusOff',
}
enum Allowance {
  ON = 'allowanceOn',
  OFF = 'allowanceOFF',
}

const DayOfWeeks = ['없음', '월', '화', '수', '목', '금', '토', '일'];

const WorkEmployeeAddThird = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const { employeeContract, addThirdInfo, setThirdInfo } =
    useEmployeeContract();
  console.log('🚀  WorkEmployeeAddThird  id:', placeId);
  console.log(employeeContract);

  const [payPerHour, setPayPerHour] = useState(MINIMUM_PAY_PER_HOUR);
  const onChangePayperHour = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= MINIMUM_PAY_PER_HOUR) {
      setPayPerHour(MINIMUM_PAY_PER_HOUR);
    } else {
      setPayPerHour(Number(e.target.value));
    }
  };

  const [paymentDay, setPaymentDay] = useState<number>(15);
  const onChangePaymentDay = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 1) {
      setPaymentDay(1);
    } else if (Number(e.target.value) >= 28) {
      setPaymentDay(28);
    } else {
      setPaymentDay(Number(e.target.value));
    }
  };

  const [restDayOfWeek, setRestDayofWeek] = useState('없음');
  const handleDayClick = (day: string) => {
    setRestDayofWeek(day); // 선택된 요일을 변경
  };

  const [bonus, setBonus] = useState<Bonus>(Bonus.OFF);
  const [allowance, setAllowance] = useState<Allowance>(Allowance.OFF);
  const [overtimeRate, setOverTimeRate] = useState<number>(0);
  const onChangeOvertimeRate = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) {
      setOverTimeRate(0);
    } else {
      setOverTimeRate(Number(e.target.value));
    }
  };

  const fetchContract = async () => {
    try {
      const response = await ApiClient.getInstance().registerEmployee(
        Number(placeId),
        employeeContract!
      );
      console.log('API 호출 결과:', response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };
  const [ready, setReady] = useState(false);
  if (ready) {
    console.log(employeeContract);
    fetchContract();
    setReady(false);
  }

  const onClickAddThird = () => {
    addThirdInfo({
      payPerHour,
      paymentDay,
      restDayOfWeek:
        restDayOfWeek === '없음'
          ? undefined
          : addSuffixDayOfWeek(restDayOfWeek as DayOfWeekShort),
      bonusAmount: bonus === Bonus.OFF ? 0 : 10000,
      otherAllowancesAmount: allowance === Allowance.OFF ? 0 : 10000,
      otherAllowancesName: allowance === Allowance.OFF ? undefined : '제수당',
      overtimeRate,
    });
    setThirdInfo({
      payPerHour,
      paymentDay,
      restDayOfWeek:
        restDayOfWeek === '없음'
          ? undefined
          : addSuffixDayOfWeek(restDayOfWeek as DayOfWeekShort),
      bonusAmount: bonus === Bonus.OFF ? 0 : 10000,
      otherAllowancesAmount: allowance === Allowance.OFF ? 0 : 10000,
      otherAllowancesName: allowance === Allowance.OFF ? undefined : '제수당',
      overtimeRate,
    });
    setReady(true);
    navigate(`/owner/myWorkPlaces/${placeId}/addEmployee/third`);
  };

  return (
    <VStack className='p-6 h-full'>
      <VStack className='gap-6'>
        <ThreeLevelUi level={3} />

        <VStack className='border border-gray-300 rounded-lg p-3 gap-6 overflow-y-scroll'>
          <HStack className='justify-between'>
            <HStack className='p-2 items-baseline gap-2'>
              <label
                htmlFor='payPerHour'
                className='text-left font-semibold h-1/2'
              >
                시급
              </label>
              <input
                id='payPerHour'
                type='number'
                value={payPerHour}
                onChange={onChangePayperHour}
                className='border-b border-b-gray-300 w-2/5 text-right'
                placeholder={`${String(MINIMUM_PAY_PER_HOUR)} 원`}
              />
              원
            </HStack>

            <HStack className='p-2 gap-2'>
              <label htmlFor='payDay' className='text-left font-semibold'>
                지급일
              </label>
              <input
                id='payDay'
                type='number'
                value={paymentDay}
                onChange={onChangePaymentDay}
                className='border-b border-b-gray-300 w-2/6 text-right'
                placeholder='15일'
              />
              일
            </HStack>
          </HStack>

          <HStack className='items-center gap-4'>
            <div className='font-semibold text-sm'>주휴일 선택</div>
            {/* 요일 선택 버튼 */}
            <div className='flex flex-row justify-center'>
              {DayOfWeeks.map((day) => (
                <button
                  className={`${restDayOfWeek === day ? 'bg-hanaLightGreen text-white' : ''} text-xs border-r border-t border-b border-gray-300 px-2 text-nowrap py-1 first:rounded-l-md first:border-l last:rounded-r-md`}
                  key={day}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </HStack>

          <HStack className='gap-2 items-center'>
            <div className='font-semibold text-sm me-5'>상여금</div>

            <HStack
              className={`${bonus === Bonus.OFF ? 'border border-hanaLightGreen text-hanaLightGreen' : ''} px-2 rounded-xl shadow-md`}
            >
              <input
                type='radio'
                id='bonusOff'
                checked={bonus === Bonus.OFF}
                onChange={() => setBonus(Bonus.OFF)}
              />
              <label htmlFor='bonusOff'>없음</label>
            </HStack>
            <HStack
              className={`${bonus === Bonus.ON ? 'border border-hanaLightGreen text-hanaLightGreen' : ''} px-2 rounded-xl shadow-md`}
            >
              <input
                type='radio'
                id='bonusOn'
                checked={bonus === Bonus.ON}
                onChange={() => setBonus(Bonus.ON)}
              />
              <label htmlFor='bonusOn'>있음</label>
            </HStack>
          </HStack>

          <HStack className='items-center gap-2'>
            <div className='font-semibold text-sm me-2'>기타급여</div>
            <HStack
              className={`${allowance === Allowance.OFF ? 'border border-hanaLightGreen text-hanaLightGreen' : ''} px-2 rounded-xl shadow-md`}
            >
              <input
                type='radio'
                id='allowanceOff'
                checked={allowance === Allowance.OFF}
                onChange={() => setAllowance(Allowance.OFF)}
              />
              <label htmlFor='allowanceOff'>없음</label>
            </HStack>
            <HStack
              className={`${allowance === Allowance.ON ? 'border border-hanaLightGreen text-hanaLightGreen' : ''} px-2 rounded-xl shadow-md`}
            >
              <input
                type='radio'
                id='allowanceOn'
                checked={allowance === Allowance.ON}
                onChange={() => setAllowance(Allowance.ON)}
              />
              <label htmlFor='allowanceOn'>있음</label>
            </HStack>
          </HStack>

          <VStack className='justify-start text-start'>
            <HStack className='gap-3'>
              <div className='font-semibold text-sm'>초과 근로</div>
              <input
                type='number'
                className='border-b border-b-gray-300 w-10 text-right'
                placeholder='0'
                value={overtimeRate}
                onChange={onChangeOvertimeRate}
              />
              %
            </HStack>

            <div className='text-xs text-gray-400'>
              5인 미만 사업장의 최소 비율은 0% 에요.
            </div>
            <div className='text-xs text-gray-400'>
              5인 이상 사업장의 최소 비율은 50% 에요.
            </div>
          </VStack>
        </VStack>
        <Spacer />
        <div className='py-6'>
          <BtnChoiceBox
            actionName={'근로계약서 생성'}
            closeName={'이전'}
            onAction={onClickAddThird}
            onClose={() => history.back()}
          />
        </div>
      </VStack>
    </VStack>
  );
};
export default WorkEmployeeAddThird;
