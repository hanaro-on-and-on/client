import { useState } from 'react';
import { VStack } from '../ui/Stack';
import { FaAngleDown } from 'react-icons/fa6';
import MyWorkPlaceListView from './MyWorkPlaceListView';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { isCurrentDate } from '../../utils/is-current-date';

const mockData = {
  year: 2024,
  month: 6,
  totalPayment: 140333000,
  ownerSalaryEmployeeListGetResponseList: [
    {
      id: 1,
      workPlaceName: '롯데리아 자양점',
      workPlaceColor: '01',
      payment: 140333000,
      ownerSalaryGetResponseList: [
        {
          id: 1,
          employeeName: '이서하',
          workStartDate: '2024-07-01',
          payment: 140333,
        },
      ],
    },
    {
      id: 2,
      workPlaceName: 'Example Work Place Name',
      workPlaceColor: '02',
      payment: 0,
      ownerSalaryGetResponseList: [],
    },
    {
      id: 3,
      workPlaceName: '롯데월드 어드벤쳐 부산',
      workPlaceColor: '03',
      payment: 0,
      ownerSalaryGetResponseList: [
        {
          id: 2,
          employeeName: '최은진',
          workStartDate: '2024-07-01',
          payment: 0,
        },
      ],
    },
  ],
};

const MyWorkPlaces = () => {
  const [data, setData] = useState(mockData);
  const currentDate = new Date();

  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  return (
    <VStack className='m-6'>
      <VStack className='border border-gray-300 rounded-md items-center justify-center gap-3 p-4'>
        <button className='flex items-center gap-3 text-sm'>
          {`${year}년 ${month}월 ${isCurrentDate(currentDate, year, month) ? '예정' : '확정'} 인건비`}{' '}
          <FaAngleDown />
        </button>
        <div className='text-2xl'>{`총 ${data.totalPayment.toLocaleString()} 원`}</div>
      </VStack>

      <VStack className='ListView mt-7 gap-2'>
        {data.ownerSalaryEmployeeListGetResponseList.map((item) => (
          <MyWorkPlaceListView
            key={item.id}
            length={item.ownerSalaryGetResponseList.length}
            {...item}
          />
        ))}
      </VStack>
      <button className='bg-hanaLightGreen gap-2 py-1 px-2 mt-2 flex items-center rounded-lg text-white self-end'>
        <AiOutlinePlusCircle />
        <div>사업장 추가</div>
      </button>

      {/* {data.ownerSalaryEmployeeListGetResponseList.map((item) =>

      )} */}
    </VStack>
  );
};

export default MyWorkPlaces;
