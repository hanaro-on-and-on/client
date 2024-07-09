import { useEffect, useState } from 'react';
import NavToggle from '../NavToggle';
import { HStack, VStack } from '../ui/Stack';
import { isCurrentDate } from '../../utils/is-current-date';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import ColorCircle from '../ui/ColorCircle';
import WorkEmployeeListView from './WorkEmployeeListView';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import NotificationAdd from './NotificationAdd';
import { useEmployeeContract } from '../../contexts/EmployeeContract-Context';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApiClient from '../../api/apiClient';
import Notification from './Notification';
import WorkPlaceNameBox from '../WorkPlaceNameBox';
import WorkPlaceName from '../ui/WorkPlaceName';

enum ToggleStatus {
  EMPLOYEES = '근무자 보기',
  NOTIFICATIONS = '공지사항',
}

const MyWorkPlaceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selected = searchParams.get('selected');

  const [data, setData] = useState<MyPlaceDetailResponse | null>(null);
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const [notifiactions, setNotifications] =
    useState<NotificationsResponse | null>(null);
  const [showAddNotification, setAddNotification] = useState(false);

  useEffect(() => {
    fetchData(year, month);
  }, [year, month]);
  useEffect(() => {
    fetchNotifications();
  }, [showAddNotification]);

  const fetchData = async (year: number, month: number) => {
    try {
      const response = await ApiClient.getInstance().getMyPlaceDetail(
        Number(id),
        year,
        month
      );
      console.log('API 호출 결과:', response);
      setData(response);
    } catch (error) {}
  };
  const fetchNotifications = async () => {
    try {
      const response = await ApiClient.getInstance().getNotifications(
        Number(id)
      );
      console.log('API 호출 결과:', response);
      setNotifications(response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const { prepareInfo } = useEmployeeContract();

  const [selectedToggle, setSelectedToggle] = useState(ToggleStatus.EMPLOYEES);

  const onClickAddEmployee = (workPlaceName: string) => {
    prepareInfo(workPlaceName);
    navigate(`/owner/myWorkPlaces/${id}/addEmployee/first`);
  };

  const onClickCloseAddNotification = () => {
    setAddNotification(false);
  };

  return (
    data && (
      <VStack className='m-6 gap-4 h-full'>
        <VStack className='border border-gray-300 rounded-md items-center justify-center gap-3 py-2'>
          <VStack className='px-3 w-full justify-between items-center'>
            <HStack className='gap-2 items-center'>
              <WorkPlaceName
                name={data.workPlaceName}
                colorType={data.workPlaceColor}
              />
              <div className='text-sm text-gray-400 ho'>{`총 ${data.employeeList.length}명`}</div>
            </HStack>

            <HStack className='text-nowrap items-end text-2xl font-bold py-2'>
              {data.payment.toLocaleString()} 원
            </HStack>
          </VStack>
          <button className='flex items-center gap-3 text-sm'>
            {`${year}년 ${month}월 ${isCurrentDate(currentDate, year, month) ? '예정' : '확정'} 인건비`}{' '}
            <FaAngleDown />
          </button>
        </VStack>

        <NavToggle
          selectedTab={selectedToggle}
          first='근무자 보기'
          second='공지사항'
          firstSelected={() => {
            setSelectedToggle(ToggleStatus.EMPLOYEES);
          }}
          secondSelected={() => {
            setSelectedToggle(ToggleStatus.NOTIFICATIONS);
          }}
        />

        {selectedToggle === ToggleStatus.EMPLOYEES && (
          <>
            <div className='flex flex-col gap-1'>
              {data.employeeList.map((employee) => (
                <WorkPlaceNameBox
                  key={employee.workPlaceEmployeeId}
                  workPlaceName={employee.employeeName}
                  colorType={data.workPlaceColor}
                  arrowText={`${employee.payment.toLocaleString()}원`}
                  arrow
                  onClick={() => {
                    navigate(
                      `/owner/myWorkPlaces/${data.workPlaceId}/employees/${employee.workPlaceEmployeeId}`
                    );
                  }}
                >
                  <div className='flex justify-start text-sm text-gray-400'>
                    {`근무 시작 ${employee.workStartDate}`}
                  </div>
                </WorkPlaceNameBox>
              ))}
            </div>
            {/* <div className='flex flex-col border border-gray-300 rounded-lg max-h-96 overflow-y-scroll'>
              {data.employeeList.map((employee) => (
                <WorkEmployeeListView
                  key={employee.workPlaceEmployeeId}
                  employeeInfo={employee}
                  placeId={data.workPlaceId}
                />
              ))}
            </div> */}
            <button
              onClick={() => onClickAddEmployee(data.workPlaceName)}
              className='bg-hanaLightGreen gap-2 py-1 px-2 mt-2 flex items-center rounded-lg text-white self-end'
            >
              <AiOutlinePlusCircle />
              <div>근무자 추가</div>
            </button>
          </>
        )}
        {selectedToggle === ToggleStatus.NOTIFICATIONS &&
          !showAddNotification &&
          notifiactions && (
            <>
              <div className='flex flex-col max-h-/3 border border-gray-300 rounded-lg overflow-y-scroll'>
                {notifiactions.list.map((n) => (
                  <Notification
                    key={n.notificationId}
                    fetchNotices={fetchNotifications}
                    {...n}
                  />
                ))}
              </div>
              <button
                className='bg-hanaLightGreen gap-2 py-1 px-2 mt-2 flex items-center rounded-lg text-white self-end'
                onClick={() => setAddNotification(true)}
              >
                <AiOutlinePlusCircle />
                <div>공지사항 추가</div>
              </button>
            </>
          )}

        {selectedToggle === ToggleStatus.NOTIFICATIONS &&
          showAddNotification && (
            <NotificationAdd
              closeAddNotification={onClickCloseAddNotification}
            />
          )}
      </VStack>
    )
  );
};
export default MyWorkPlaceDetail;
