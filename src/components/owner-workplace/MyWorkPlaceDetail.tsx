import { useState } from 'react';
import NavToggle from '../NavToggle';
import { HStack, VStack } from '../ui/Stack';
import { isCurrentDate } from '../../utils/is-current-date';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import ColorCircle from '../ui/ColorCircle';
import WorkEmployeeListView from './WorkEmployeeListView';

const mockData = {
  year: '2024',
  month: '06',
  workPlaceId: 1,
  workPlaceName: '롯데리아 어디어디어디 점',
  workPlaceColor: '1',
  totalPayPerMonth: 18000000,
  workEmployees: [
    {
      workEmployeeId: 1,
      employeeName: '이신광',
      monthPay: 500000,
      fromDay: '2021-04-05',
    },
    {
      workEmployeeId: 2,
      employeeName: '이서하',
      monthPay: 1951400,
      fromDay: '2024-03-14',
    },
    {
      workEmployeeId: 3,
      employeeName: '정연주',
      monthPay: 102900,
      fromDay: '2024-06-01',
    },
  ],
};

const MyWorkPlaceDetail = () => {
  const [data, setData] = useState(mockData);
  const currentDate = new Date();

  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  return (
    <VStack className='m-6 gap-4'>
      <VStack className='border border-gray-300 rounded-md items-center justify-center gap-3 py-2'>
        <button className='flex items-center gap-3 text-sm'>
          {`${year}년 ${month}월 ${isCurrentDate(currentDate, year, month) ? '예정' : '확정'} 인건비`}{' '}
          <FaAngleDown />
        </button>

        <HStack className='px-3 w-full justify-between items-center'>
          <div className='w-1/12'>
            <ColorCircle workPlaceColor={data.workPlaceColor} />
          </div>
          <VStack className='text-start w-4/12'>
            <div className='font-bold text-ellipsis overflow-hidden whitespace-nowrap'>{`${data.workPlaceName}`}</div>
            <div className='text-sm text-gray-400 ho'>{`총 ${length}명`}</div>
          </VStack>

          <HStack className='text-nowrap items-end w-5/12'>
            {data.totalPayPerMonth.toLocaleString()} 원
          </HStack>
        </HStack>
      </VStack>

      <NavToggle
        first='근무자 보기'
        second='공지사항'
        firstSelected={() => {}}
        secondSelected={() => {}}
      />

      <div className='flex flex-col border border-gray-300 rounded-lg'>
        {data.workEmployees.map((employee) => (
          <WorkEmployeeListView key={employee.workEmployeeId} {...employee} />
        ))}
      </div>
    </VStack>
  );
};
export default MyWorkPlaceDetail;
