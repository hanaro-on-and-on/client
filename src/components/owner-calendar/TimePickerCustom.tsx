import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { TimePicker } from 'react-time-picker-typescript';
import 'react-time-picker-typescript/dist/style.css';
import './TimePickerCustom.css';
import { HStack } from '../ui/Stack';

type TimePickerCustomProps = {
  time: string;
  onChangeTime: (time: string) => void;
};

const TimePickerCustom = ({ time, onChangeTime }: TimePickerCustomProps) => {
  // const [value, setValue] = useState('10:00');
  const [isFocused, setIsFocused] = useState(false);

  const handleTimeChange = (timeValue: string | null) => {
    if (timeValue) onChangeTime(timeValue);
  };

  return (
    <HStack
      className={`border-b-2 font-bold items-center ${isFocused ? 'border-b-hanaLightGreen' : 'border-b-gray-400'}`}
    >
      <TimePicker
        onChange={handleTimeChange}
        value={time}
        saveButtonText='저장'
        cancelButtonText='취소'
        inputClassName={`${isFocused ? 'text-hanaLightGreen' : 'text-black'}`}
        onOpen={() => setIsFocused(true)}
        onCancel={() => setIsFocused(false)}
      />
      <FaAngleDown
        className={`${isFocused ? 'text-hanaLightGreen' : 'text-gray-400'}`}
      />
    </HStack>
  );
};

export default TimePickerCustom;
