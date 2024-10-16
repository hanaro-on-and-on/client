import { useEffect, useState } from 'react';
import { HStack, VStack } from '../ui/Stack';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import {
  AiOutlineExclamationCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { isCurrentDate } from '../../utils/is-current-date';
import ApiClient from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import WorkPlaceNameBox from '../WorkPlaceNameBox';

const MyWorkPlaces = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<MyPlacesResponse | null>(null);
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const onClickAddPlace = () => {
    navigate('/owner/addPlaceFirst');
  };

  const fetchData = async (year: number, month: number) => {
    try {
      const response = await ApiClient.getInstance().getMyPlaces(year, month);
      console.log('API 호출 결과:', response);
      setData(response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const onClickDownMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };
  const onClickUpMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    fetchData(year, month);
  }, [year, month]);

  return (
    data && (
      <VStack className='m-6'>
        <VStack className='bg-white border border-gray-300 rounded-md items-center justify-center gap-3 p-4'>
          <HStack className='items-center justify-center gap-4'>
            <button className='bg-white' onClick={onClickDownMonth}>
              <FaAngleLeft />
            </button>
            <div className='text-sm'>
              {`${year}년 ${month}월 ${isCurrentDate(currentDate, year, month) ? '예정' : '확정'} 인건비`}{' '}
              {/* <FaAngleDown /> */}
            </div>
            <button className='bg-white' onClick={onClickUpMonth}>
              <FaAngleRight />
            </button>
          </HStack>
          <div className='text-2xl'>{`총 ${data.totalPayment.toLocaleString()} 원`}</div>
        </VStack>

        {data.workPlaceList.length === 0 ? (
          <VStack className='flex items-center text-gray-300 m-16'>
            <AiOutlineExclamationCircle className='h-full text-9xl' />
            <span className='text-xl text-center'>
              등록된 사업장이 없습니다.
            </span>
            <span className='text-2xl text-center'>사업장을 등록해주세요</span>
          </VStack>
        ) : (
          <div className='mt-5'>
            {data?.workPlaceList.map((item) => (
              <WorkPlaceNameBox
                key={item.workPlaceId}
                workPlaceName={item.workPlaceName}
                colorType={item.workPlaceColor}
                arrow
                arrowText={`총 ${item.payment.toLocaleString()}원`}
                onClick={() =>
                  navigate(`/owner/myWorkPlaces/${item.workPlaceId}`)
                }
              >
                <div className='flex gap-3'>
                  <span className='text-gray-400'>
                    총 {item.employeeList.length}명
                  </span>
                </div>
              </WorkPlaceNameBox>
            ))}
          </div>
        )}
        <button
          className='bg-hanaLightGreen gap-2 py-1 px-2 mt-2 flex items-center rounded-lg text-white self-end'
          onClick={onClickAddPlace}
        >
          <AiOutlinePlusCircle />
          <div>사업장 추가</div>
        </button>
      </VStack>
    )
  );
  // : (
  //   <VStack className='m-6 gap-60'>
  //     <button
  //       className='bg-hanaLightGreen gap-2 py-1 px-2 mt-2 flex items-center rounded-lg text-white self-end'
  //       onClick={onClickAddPlace}
  //     >
  //       <AiOutlinePlusCircle />
  //       <div>사업장 추가</div>
  //     </button>
  //     <VStack className='flex items-center text-gray-300'>
  //       <AiOutlineExclamationCircle className='h-full text-9xl' />
  //       <span className='text-xl text-center'>등록된 사업장이 없습니다.</span>
  //       <span className='text-2xl text-center'>사업장을 등록해주세요</span>
  //     </VStack>
  //   </VStack>
  // );
};

export default MyWorkPlaces;
