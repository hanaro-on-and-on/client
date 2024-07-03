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

const days = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const Attendance = () => {
  const navigation = useNavigate();

  const [attendances, setAttendances] =
    useState<EmployeeTodayAttendancesResponse | null>(null);

  const isActivated = (target: AttendanceTodayWork): boolean => {
    const index = target.workTime.findIndex(
      (item) => item.workDayOfWeek === days[day]
    );
    if (!index) return false;

    const startTime = target.workTime[index].workStartTime;
    const sh = startTime.substring(0, startTime.indexOf(':'));
    const smin = startTime.substring(startTime.indexOf(':') + 1);

    const endTime = target.workTime[index].workEndTime;
    const eh = endTime.substring(0, startTime.indexOf(':'));
    const emin = endTime.substring(startTime.indexOf(':') + 1);

    const start = new Date();
    start.setTime(+sh);
    start.setMinutes(+smin);

    const end = new Date();
    end.setTime(+eh);
    end.setMinutes(+emin);

    if (start < today && start < end) return true;

    return false;
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
                          colorType={item.colorTypeCode}
                        />
                        <FaAngleRight />
                      </button>
                      <div>
                        {item.workTime
                          .filter((it) => it.workDayOfWeek === days[day])
                          .map((i, index) => (
                            <div
                              key={i.restEndTime + String(index)}
                              className='font-bold text-gray-400'
                            >
                              {i.workStartTime} - {i.workEndTime}
                            </div>
                          ))}
                      </div>

                      <div className='border rounded-sm text-sm border-hanaLightGreen px-3 mb-2'>
                        <div className='flex font-semibold '>
                          <span className='pr-1'>[{item.workPlaceName}]</span>
                          <span>{item.notice[0].title}</span>
                        </div>
                        {` ${item.notice[0].content}`}
                      </div>
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
                          colorType={item.colorTypeCode}
                        />
                        {item.workTime.length > 0 ? (
                          <div className='text-gray-400 text-sm'>
                            {item.workTime[0]?.workDayOfWeek}{' '}
                            {item.workTime[0]?.workStartTime}
                            {' - '}
                            {item.workTime[0]?.workEndTime}
                          </div>
                        ) : (
                          <div className='text-gray-400 text-sm'>
                            입력된 근무일정 없음
                          </div>
                        )}
                      </div>
                      <FaAngleDown />
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
