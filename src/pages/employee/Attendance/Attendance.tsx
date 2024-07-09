import { FaAngleRight } from 'react-icons/fa6';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnPrimary from '../../../components/BtnPrimary';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../../api/apiClient';
import { useEffect, useState } from 'react';
import BtnGray from '../../../components/BtnGray';

import ModalCenter from '../../../components/ModalCenter';
import BtnDanger from '../../../components/BtnDanger';
import PulseWorkPlace from '../../../components/ui/PulseWorkPlace';
import PulseAttendance from '../../../components/ui/PulseAttendance';

enum AttendanceStatus {
  WORKING = 'working',
  COMPLETED = 'completed',
  PREPARING = 'preparing',
}
const Attendance = () => {
  const navigation = useNavigate();
  const [isModalCenterOpen, setModalCenterOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus[]>(
    []
  );

  const [location, setLoacation] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 0, latitude: 0 });

  const successHandler = (response: any) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };
  const [attendances, setAttendances] =
    useState<EmployeeTodayAttendancesResponse | null>(null);

  const getAttendanceList = async () => {
    try {
      const response =
        await ApiClient.getInstance().employeeGetAttendanceList();

      setAttendances(response);

      response.works.forEach((item, index) => {
        if (item.realStartTime) {
          if (item.realEndTime) {
            setAttendanceStatus((pre) => {
              pre[index] = AttendanceStatus.COMPLETED;
              return [...pre];
            });
          }
          if (!item.realEndTime) {
            setAttendanceStatus((pre) => {
              pre[index] = AttendanceStatus.WORKING;
              return [...pre];
            });
          }
        } else {
          setAttendanceStatus((pre) => {
            pre[index] = AttendanceStatus.PREPARING;
            return [...pre];
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(attendances), [];
  });

  const checkIn = async (id: number) => {
    try {
      const response: EmployeeCheckInResponse =
        await ApiClient.getInstance().employeeCheckIn({
          workPlaceEmployeeId: id,
          location: { lat: location.latitude, lng: location.longitude },
        });

      if (response) {
        if (!response.success) {
          openModal('출석할 수 없습니다.\n 가까운 위치에서 다시 시도해주세요');
          return;
        }
        getAttendanceList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkOut = async (id: number) => {
    try {
      const response: EmployeeCheckOutResponse =
        await ApiClient.getInstance().employeeCheckOut({
          workPlaceEmployeeId: id,
          location: { lat: location.latitude, lng: location.longitude },
        });

      if (response) {
        getAttendanceList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (msg: string = '') => {
    setModalMsg(msg);
    setModalCenterOpen(true);
  };

  const closeModal = () => {
    setModalCenterOpen(false);
  };

  useEffect(() => {
    getAttendanceList();
    navigator.geolocation.getCurrentPosition(
      successHandler,
      (err) => {
        console.log(err);
      },
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );
  }, []);

  return (
    <>
      {isModalCenterOpen && (
        <ModalCenter
          title='알림'
          closeModal={closeModal}
          confirmAction={closeModal}
        >
          <div>{modalMsg}</div>
        </ModalCenter>
      )}

      <Frame navTitle='알바ON' toolBar footer>
        <div className='w-full flex flex-col gap-10'>
          {/* 오늘 출근 목록 */}
          <Wrapper title='오늘 출근 목록'>
            <div className='flex flex-col gap-1'>
              {attendances && attendances.works?.length > 0 ? (
                attendances?.works.map((item, index) => (
                  <WhiteBox
                    key={item.workPlaceEmployeeId}
                    border
                    className='py-5 '
                  >
                    <div className='flex flex-col gap-1 text-start'>
                      <button
                        type='button'
                        className='flex justify-between items-center bg-transparent'
                        onClick={() =>
                          navigation(`detail/${item.workPlaceEmployeeId}`)
                        }
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
                            <span className='pr-1'>
                              📢 [{item.workPlaceName}]
                            </span>
                            <span>{item?.notice[0].title}</span>
                          </div>
                          {` ${item?.notice[0].content}`}
                        </div>
                      )}
                      {attendanceStatus[index] ===
                        AttendanceStatus.PREPARING && (
                        <BtnPrimary
                          text='출근'
                          action={() => checkIn(item.workPlaceEmployeeId)}
                        />
                      )}
                      {attendanceStatus[index] === AttendanceStatus.WORKING && (
                        <BtnDanger
                          text='퇴근'
                          action={() => checkOut(item.workPlaceEmployeeId)}
                        />
                      )}
                      {attendanceStatus[index] ===
                        AttendanceStatus.COMPLETED && (
                        <BtnGray text='출근 불가' disabled />
                      )}
                    </div>
                  </WhiteBox>
                ))
              ) : (
                <WhiteBox>
                  <div className='flex h-[55px] items-center justify-center text-gray-500 text-sm'>
                    오늘 출근 일정이 없습니다
                  </div>
                </WhiteBox>
              )}
              {!attendances && <PulseAttendance />}
            </div>
          </Wrapper>
          {/* 전체 출근 목록 */}
          <Wrapper title='전체 출근 목록'>
            <div className='flex flex-col gap-1'>
              {attendances && attendances.totalWorks?.length > 0 ? (
                attendances?.totalWorks?.map((item) => (
                  <WhiteBox key={item.workPlaceEmployeeId} border>
                    <button
                      type='button'
                      className='flex justify justify-between items-center w-full h-full py-3 bg-transparent'
                      onClick={() =>
                        navigation(`detail/${item.workPlaceEmployeeId}`)
                      }
                    >
                      <div className='flex flex-col items-start gap-1'>
                        <WorkPlaceName
                          name={item.workPlaceName}
                          colorType={item.colorTypeCd}
                        />
                        {item.workTime.length > 0 ? (
                          <div className='text-gray-400 text-sm'>
                            <span className='font-semibold pr-3'>근무요일</span>
                            {item.workTime?.map((i) => i.workDayOfWeek + ' ')}
                          </div>
                        ) : (
                          <div className='text-gray-400 text-sm'>
                            입력된 근무일정 없음
                          </div>
                        )}
                      </div>
                    </button>
                  </WhiteBox>
                ))
              ) : (
                <WhiteBox>
                  <div className='flex h-[55px] items-center justify-center text-gray-500 text-sm'>
                    다른 출근 일정이 없습니다
                  </div>
                </WhiteBox>
              )}
              {!attendances && (
                <div className='flex flex-col gap-2'>
                  <PulseWorkPlace />
                  <PulseWorkPlace />
                  <PulseWorkPlace />
                </div>
              )}
            </div>
          </Wrapper>
        </div>
      </Frame>
    </>
  );
};

export default Attendance;
