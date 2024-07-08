import { HStack, VStack } from '../components/ui/Stack';
import TimePickerCustom from '../components/owner-calendar/TimePickerCustom';
import TestCalendar from '../components/ui/TestCalendar';
import TestTimePicker from '../components/owner-calendar/TimePickerCustom';

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

const UiTest = () => {
  return (
    <VStack className='min-h-full h-ful pb-8'>
      {/* <TimePickerCustom /> */}
      <TestTimePicker />
    </VStack>
  );
};
export default UiTest;
