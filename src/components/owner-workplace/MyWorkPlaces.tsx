import { useEffect, useState } from 'react';
import { VStack } from '../ui/Stack';
import { FaAngleDown } from 'react-icons/fa6';
import MyWorkPlaceListView from './MyWorkPlaceListView';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { isCurrentDate } from '../../utils/is-current-date';
import ApiClient from '../../api/apiClient';

const MyWorkPlaces = () => {
  const [data, setData] = useState<MyPlacesResponse | null>(null);
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const fetchData = async (year: number, month: number) => {
    try {
      const response = await ApiClient.getInstance().getMyPlaces(year, month);
      console.log('API 호출 결과:', response);
      setData(response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchData(year, month);
  }, [year, month]);

  return (
    data && (
      <VStack className='m-6'>
        <VStack className='border border-gray-300 rounded-md items-center justify-center gap-3 p-4'>
          <button className='flex items-center gap-3 text-sm'>
            {`${year}년 ${month}월 ${isCurrentDate(currentDate, year, month) ? '예정' : '확정'} 인건비`}{' '}
            <FaAngleDown />
          </button>
          <div className='text-2xl'>{`총 ${data.totalPayment.toLocaleString()} 원`}</div>
        </VStack>

        <VStack className='ListView mt-7 gap-2'>
          {data?.workPlaceList.map((item) => (
            <MyWorkPlaceListView
              key={item.workPlaceId}
              length={item.employeeList.length}
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
    )
  );
};

export default MyWorkPlaces;
