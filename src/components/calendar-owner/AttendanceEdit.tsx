import { useState } from 'react';
import { useAttendance } from '../../contexts/Attendance-Context';
import InputBox from '../ui/InputBox';
import { VStack } from '../ui/Stack';
import TimeBox from './TimeBox';
import WorkPlaceName from '../ui/WorkPlaceName';
import SelectOptions from './SelectOptions';
import Select from './Select';

const mockData = [
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 1, // Long
    employeeNm: '이신광', // String
  },
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 2, // Long
    employeeNm: '이서하', // String
  },
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01',
    workPlaceEmployeeId: 3, // Long
    employeeNm: '정연주', // String
  },
  {
    workPlaceId: 2, // Long
    workPlaceNm: '버거킹',
    workPlaceColor: '02', // String
    workPlaceEmployeeId: 4, // Long
    employeeNm: '고영우', // String
  },
  {
    workPlaceId: 2, // Long
    workPlaceNm: '버거킹',
    workPlaceColor: '02', // String
    workPlaceEmployeeId: 5, // Long
    employeeNm: '최은진', // String
  },
];

const AttendanceEdit = () => {
  const [workEmployeeList, setWorkEmployeeList] = useState(mockData);

  const { attendance, changeAttendance } = useAttendance();
  const [employeeId, setEmployeeId] = useState(attendance?.workPlaceEmployeeId);
  const [startTime, setStartTime] = useState(attendance?.startTime);
  const [endTime, setEndTime] = useState(attendance?.endTime);
  const [payPerHour, setPayPerHour] = useState(attendance?.payPerHour);

  console.log(attendance);

  return (
    <VStack className='px-6 py-10 gap-6'>
      <InputBox label='근무자명'>
        <Select options={workEmployeeList} />
      </InputBox>
      <InputBox label='근무 시간'>
        <TimeBox />
      </InputBox>
      <InputBox label='시급' value={String(payPerHour)} />
    </VStack>
  );
};
export default AttendanceEdit;
