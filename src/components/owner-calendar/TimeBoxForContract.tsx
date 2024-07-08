import { CgBorderStyleSolid } from 'react-icons/cg';
import { HStack, VStack } from '../ui/Stack';
import TimePickerCustom from './TimePickerCustom';
import { DayOfWeek } from '../../types/contract';

type TimeBoxForContractProps = {
  selectedDayofWeek: DayOfWeek;
  startTime?: string;
  changeStartTime: (time: string) => void;
  endTime?: string;
  changeEndTime: (time: string) => void;
  restStartTime?: string;
  changeRestStartTime: (time: string) => void;
  restEndTime?: string;
  changeRestEndTime: (time: string) => void;
  setErrorMessage: (error: string) => void;
};

const TimeBoxForContract = (props: TimeBoxForContractProps) => {
  const {
    selectedDayofWeek,
    startTime,
    changeStartTime,
    endTime,
    changeEndTime,
    restStartTime,
    changeRestStartTime,
    restEndTime,
    changeRestEndTime,
    setErrorMessage,
  } = props;

  // const [pickerKey, setPickerKey] = useState(0);

  // 오류 메시지 상태
  // const [errorMessage, setErrorMessage] = useState('');

  const startDate = new Date(`1970-01-01T${startTime}:00`);
  const endDate = new Date(`1970-01-01T${endTime}:00`);
  const restStartDate = new Date(`1970-01-01T${restStartTime}:00`);

  const validateEndTime = (timeValue: string | null) => {
    const selectDate = new Date(`1970-01-01T${timeValue}:00`);
    selectDate <= startDate
      ? setErrorMessage('근로 종료시간은 근로 시작시간보다 늦어야 해요.')
      : setErrorMessage('');
  };
  const validateRestStartTime = (timeValue: string | null) => {
    const selectDate = new Date(`1970-01-01T${timeValue}:00`);
    selectDate < startDate || selectDate > endDate
      ? setErrorMessage('휴게 시작시간은 근로 시간 사이여야 해요.')
      : setErrorMessage('');
  };

  const validateRestEndTime = (timeValue: string | null) => {
    const selectDate = new Date(`1970-01-01T${timeValue}:00`);
    selectDate <= restStartDate || selectDate > endDate
      ? setErrorMessage(`휴게 종료시간이 올바르지 않아요.`)
      : setErrorMessage('');
  };
  console.log(selectedDayofWeek);

  return (
    <VStack className='mx-auto gap-3'>
      <HStack className='items-center justify-between'>
        <div className='font-semibold text-xs me-3'>근무 시간</div>
        <TimePickerCustom
          key={`${selectedDayofWeek}-start`}
          time={startTime}
          onChangeTime={changeStartTime}
        />
        <CgBorderStyleSolid />
        <TimePickerCustom
          key={`${selectedDayofWeek}-end`}
          time={endTime}
          onChangeTime={changeEndTime}
          onSaveTime={validateEndTime}
        />
      </HStack>
      <HStack className='items-center justify-between'>
        <div className='font-semibold text-xs me-3'>휴게 시간</div>
        <TimePickerCustom
          key={`${selectedDayofWeek}-rest-start`}
          time={restStartTime}
          onChangeTime={changeRestStartTime}
          onSaveTime={validateRestStartTime}
        />
        <CgBorderStyleSolid />
        <TimePickerCustom
          key={`${selectedDayofWeek}-rest-end`}
          time={restEndTime}
          onChangeTime={changeRestEndTime}
          onSaveTime={validateRestEndTime}
        />
      </HStack>
      {/* 
      {errorMessage && (
        <div className='text-red-400 text-sm'>{errorMessage}</div>
      )} */}
      {/* <button onClick={resetTimePicker}>Reset Time Pickers</button> */}
    </VStack>
  );
};

export default TimeBoxForContract;
