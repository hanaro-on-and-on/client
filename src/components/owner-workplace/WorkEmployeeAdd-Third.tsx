import { useState } from 'react';
import { MINIMUM_PAY_PER_HOUR } from '../../utils/const-value';
import { HStack, Spacer, VStack } from '../ui/Stack';
import { DayOfWeekShort } from './WorkEmployeeAdd-Second';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import ThreeLevelUi from '../ui/ThreeLevelUi';

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
  const [selectDayOfWeek, setSelectDayOfWeek] = useState<Bonus>(Bonus.OFF);

  const [bonus, setBonus] = useState('bonusOff');
  const [allowance, setAllowance] = useState<Allowance>(Allowance.OFF);

  // 요일 버튼을 클릭했을 때 호출되는 함수
  const handleDayClick = (day: string) => {
    setSelectDayOfWeek(day); // 선택된 요일을 변경
  };

  return (
    <VStack className='p-6 h-full'>
      <VStack className='gap-6'>
        <ThreeLevelUi level={3} />

        <VStack className='border border-gray-300 rounded-lg p-3 gap-4 overflow-y-scroll'>
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
                className='border-b border-b-gray-300 w-1/2'
                placeholder={`${String(MINIMUM_PAY_PER_HOUR)} 원`}
              />
            </HStack>

            <HStack className='p-2 gap-2'>
              <label htmlFor='payDay' className='text-left font-semibold'>
                지급일
              </label>
              <input
                id='payDay'
                type='number'
                className='border-b border-b-gray-300 w-1/2'
                placeholder='15일'
              />
            </HStack>
          </HStack>

          <VStack className='items-center gap-2'>
            <div className='font-semibold'>주휴일 선택</div>
            {/* 요일 선택 버튼 */}
            <div className='self-center flex flex-row justify-center'>
              {DayOfWeeks.map((day) => (
                <button
                  className={`${selectDayOfWeek === day ? 'bg-hanaLightGreen text-white' : ''} border-r border-t border-b border-gray-300 px-2 py-1 first:rounded-l-lg first:border-l last:rounded-r-lg`}
                  key={day}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </VStack>

          <HStack className='gap-2'>
            <div className='font-semibold me-5'>상여금</div>

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

          <HStack>
            <div className='font-semibold me-3'>기타급여</div>
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

          <VStack className='justify-start text-end'>
            <HStack className='gap-3'>
              <div className='font-semibold'>초과 근로</div>
              <input
                type='number'
                className='border-b border-b-gray-300 w-10 text-right'
                placeholder='0'
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
            onAction={() => {}}
            onClose={() => history.back()}
          />
        </div>
      </VStack>
    </VStack>
  );
};
export default WorkEmployeeAddThird;
