import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnPrimary from '../../../components/BtnPrimary';
import ToolBar2 from '../../../components/ui/ToolBar2';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../../api/apiClient';
import { useEffect, useState } from 'react';
import BtnGray from '../../../components/BtnGray';
import ToolBarLink from '../../../components/ui/ToolBarLink';
import { EmployeeMenuList } from '../datas';

const today = new Date();
const day = today.getDay();
const month = today.getMonth() + 1;
const currentTime = today.getHours();
const currentTimeMin = today.getMinutes();

const days = ['일', '월', '화', '수', '목', '금', '토'];

const Attendance = () => {
  const navigation = useNavigate();

  const [attendances, setAttendances] =
    useState<EmployeeTodayAttendancesResponse | null>(null);

  // const isActivated = (target: AttendanceTodayWork): boolean => {
  //   const index = target.workTime.findIndex(
  //     (item) => item.workDayOfWeek === days[day]
  //   );
  //   if (!index) return false;

  //   const startTime = target.workTime[index].workStartTime;
  //   const sh = startTime.substring(0, startTime.indexOf(':'));
  //   const smin = startTime.substring(startTime.indexOf(':') + 1);

  //   const endTime = target.workTime[index].workEndTime;
  //   const eh = endTime.substring(0, startTime.indexOf(':'));
  //   const emin = endTime.substring(startTime.indexOf(':') + 1);

  //   const start = new Date();
  //   start.setTime(+sh);
  //   start.setMinutes(+smin);

  //   const end = new Date();
  //   end.setTime(+eh);
  //   end.setMinutes(+emin);

  //   if (start < today && start < end) return true;

  //   return false;
  // };

  const isActivated = (target: AttendanceTodayWork): boolean => {
    const startTime = new Date(target.startTime);
    const endTime = new Date(target.endTime);

    const realStart = target.realStartTime
      ? new Date(target.realStartTime)
      : null;
    const realEnd = new Date(target.realEndTime) || null;

    const now = new Date();

    if (!realStart) return false;
    if (startTime.getDate() && endTime.getDate()) {
      if (endTime < now) return false;
      if (now.getTime() < startTime.getTime() - 1) return false;
    }

    return true;
  };

  const getAttendanceList = async () => {
    try {
      const response =
        await ApiClient.getInstance().employeeGetAttendanceList();

      console.log(response);
      setAttendances(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAttendanceList();
  }, []);

  return (
    <>
      {attendances && (
        <Frame navTitle='알바ON'>
          <ToolBarLink options={EmployeeMenuList} />
          <div className='w-full flex flex-col gap-10 mt-7'>
            {/* 오늘 출근 목록 */}
            <Wrapper title='오늘 출근 목록'>
              <div>
                {attendances?.works.map((item) => (
                  <WhiteBox
                    key={item.workPlaceEmployeeId}
                    border
                    className='py-5'
                  >
                    <div className='flex flex-col gap-1 text-start'>
                      <button
                        type='button'
                        className='flex justify-between items-center bg-transparent'
                        onClick={() => navigation('detail/롯데리아')}
                      >
                        <WorkPlaceName
                          name={item.workPlaceName}
                          colorType={item.colorTypeCd}
                        />
                        <FaAngleRight />
                      </button>
                      <div className='text-sm'>{`${new Date(item.startTime).getHours()}:${new Date(item.startTime).getMinutes() || '00'} - ${new Date(item.endTime).getHours()}:${new Date(item.endTime).getMinutes() || '00'}`}</div>

                      {item.notice.length > 0 && (
                        <div className='border rounded-sm text-sm border-hanaLightGreen px-3 py-1 mb-2'>
                          <div className='flex font-semibold '>
                            <span className='pr-1'>[{item.workPlaceName}]</span>
                            <span>{item?.notice[0].title}</span>
                          </div>
                          {` ${item?.notice[0].content}`}
                        </div>
                      )}
                      {isActivated(item) ? (
                        <BtnPrimary text='출근' action={() => {}} />
                      ) : (
                        <BtnGray text='출근' action={() => {}} disabled />
                      )}
                    </div>
                  </WhiteBox>
                ))}
              </div>
            </Wrapper>
            {/* 전체 출근 목록 */}
            <Wrapper title='전체 출근 목록'>
              <div className='flex flex-col gap-1'>
                {attendances?.totalWorks?.map((item) => (
                  <WhiteBox
                    key={item.workPlaceEmployeeId}
                    border
                    className='py-3'
                  >
                    <div className='flex justify justify-between items-center '>
                      <div className='flex flex-col items-start gap-1'>
                        <WorkPlaceName
                          name={item.workPlaceName}
                          colorType={item.colorTypeCd}
                        />
                        {item.workTime.length > 0 ? (
                          <div className='text-gray-400 text-sm'>
                            <span className='font-semibold pr-3'>근무요일</span>
                            {item.workTime?.map((i) => i.workDayOfWeek + ' ')}
                            {/* {item.workTime[0].workDayOfWeek}{' '}
                            {item.workTime[0].workStartTime}
                            {' - '}
                            {item.workTime[0].workEndTime} */}
                          </div>
                        ) : (
                          <div className='text-gray-400 text-sm'>
                            입력된 근무일정 없음
                          </div>
                        )}
                      </div>
                    </div>
                  </WhiteBox>
                ))}
              </div>
            </Wrapper>
          </div>
        </Frame>
      )}
    </>
  );
};

export default Attendance;
