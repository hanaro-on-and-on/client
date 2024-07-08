import { useState } from 'react';
import { MINIMUM_PAY_PER_HOUR } from '../../utils/const-value';
import { HStack, Spacer, VStack } from '../ui/Stack';
import { DayOfWeekShort } from './WorkEmployeeAdd-Second';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import { FaCheckCircle } from 'react-icons/fa';
import BtnBottom from '../BtnBottom';

enum Bonus {
  ON = 'bonusOn',
  OFF = 'bonusOff',
}
enum Allowance {
  ON = 'allowanceOn',
  OFF = 'allowanceOFF',
}

const DayOfWeeks = ['없음', '월', '화', '수', '목', '금', '토', '일'];

const WorkEmployeeAddComplete = () => {
  const [selectDayOfWeek, setSelectDayOfWeek] = useState<Bonus>(Bonus.OFF);

  const [bonus, setBonus] = useState('bonusOff');
  const [allowance, setAllowance] = useState<Allowance>(Allowance.OFF);

  // 요일 버튼을 클릭했을 때 호출되는 함수
  const handleDayClick = (day: string) => {
    setSelectDayOfWeek(day); // 선택된 요일을 변경
  };

  return (
    <VStack className='p-6 h-full'>
      <VStack className='m-auto gap-3 items-center'>
        <FaCheckCircle className='text-8xl text-hanaLightGreen' />
        <div className='text-center text-2xl'>직원을</div>
        <div className='text-center text-2xl'> 등록했어요👍</div>
      </VStack>

      <button className='bg-hanaLightGreen rounded-md min-w-full text-white font-semibold h-[45px] text-center'>
        확인
      </button>
    </VStack>
  );
};
export default WorkEmployeeAddComplete;
