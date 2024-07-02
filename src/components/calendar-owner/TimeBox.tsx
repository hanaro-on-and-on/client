import { CgBorderStyleSolid } from 'react-icons/cg';
import { HStack, VStack } from '../ui/Stack';
import { FaAngleDown } from 'react-icons/fa6';
import TimePickerCustom from './TimePickerCustom';
import { ChangeEvent } from 'react';

type TimeBoxProps = {
  startTime: string;
  changeStartTime: (time: string) => void;
  endTime: string;
  changeEndTime: (time: string) => void;
  restMinutes: number;
  changeRestMinutes: (minutes: number) => void;
};

const TimeBox = (props: TimeBoxProps) => {
  const {
    startTime,
    changeStartTime,
    endTime,
    changeEndTime,
    restMinutes,
    changeRestMinutes,
  } = props;

  const onChangeRestMinute = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      return (e.target.value = '0');
    }
    changeRestMinutes(Number(e.target.value));
  };

  return (
    <VStack className='mx-auto gap-3'>
      <HStack className='items-center justify-between'>
        <div className='font-semibold text-sm me-3'>근무 시간</div>
        <TimePickerCustom time={startTime} onChangeTime={changeStartTime} />
        <CgBorderStyleSolid />
        <TimePickerCustom time={endTime} onChangeTime={changeEndTime} />
      </HStack>
      <HStack className='items-center justify-between'>
        <div className='font-semibold text-sm me-3'>휴게 시간</div>
        <div>
          <input
            className='max-w-16 border-b-2 border-b-gray-400 font-bold items-center'
            type={'number'}
            value={restMinutes}
            onChange={onChangeRestMinute}
          />
          분
        </div>
      </HStack>
    </VStack>
  );
};

export default TimeBox;
