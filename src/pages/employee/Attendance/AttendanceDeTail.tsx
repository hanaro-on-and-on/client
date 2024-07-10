import { useParams } from 'react-router-dom';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import ApiClient from '../../../api/apiClient';
import clsx from 'clsx';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnPrimary from '../../../components/BtnPrimary';
import PulseWorkPlace from '../../../components/ui/PulseWorkPlace';
import ModalCenter from '../../../components/ModalCenter';
const { kakao } = window;

const days = ['일', '월', '화', '수', '목', '금', '토', '일'];

const AttendanceDetail = () => {
  const { workPlaceId, code } = useParams();
  const [workingDay, setWorkingDay] = useState<
    {
      day: null | string;
      start: null | string;
      end: null | string;
      isWorkDay: boolean;
    }[]
  >([]);

  const [isModalCenterOpen, setModalCenterOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [attendanceDetail, setAttendaceDetail] =
    useState<EmployeeAttendanceDetail | null>(null);
  const [location, setLoacation] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 126.9729, latitude: 37.5759722 });

  const successHandler = (response: any) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const openModal = (msg: string = '') => {
    setModalMsg(msg);
    setModalCenterOpen(true);
  };

  const getDetail = async () => {
    if (!workPlaceId) return;
    try {
      const response: EmployeeAttendanceDetail =
        await ApiClient.getInstance().employeeGetAttendanceDetail(+workPlaceId);
      setAttendaceDetail(response);
      console.log('detail', response);
      isActivated(response.workTime);
    } catch (err) {
      console.log(err);
    }
  };

  const isActivated = (workTime: AttendanceWorkTime[]) => {
    // const idx = workTime.findIndex((item) => item.workDayOfWeek === day);
    // if (idx != -1) return idx;

    const ret = Array(7).fill({
      day: null,
      start: null,
      end: null,
      isWorkDay: false,
    });

    workTime.forEach((item, index) => {
      if (item.workDayOfWeek.charAt(0) === '월') {
        ret[1] = {
          day: '월',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
      if (item.workDayOfWeek.charAt(0) === '화') {
        ret[2] = {
          day: '화',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
      if (item.workDayOfWeek.charAt(0) === '수') {
        ret[3] = {
          day: '수',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
      if (item.workDayOfWeek.charAt(0) === '목') {
        ret[4] = {
          day: '목',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
      if (item.workDayOfWeek.charAt(0) === '금') {
        ret[2] = {
          day: '금',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
      if (item.workDayOfWeek.charAt(0) === '토') {
        ret[2] = {
          day: '토',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
      if (item.workDayOfWeek.charAt(0) === '일') {
        ret[0] = {
          day: '일',
          start: item.workStartTime,
          end: item.workEndTime,
          isWorkDay: true,
        };
      }
    });
    setWorkingDay(ret);
  };

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
        getDetail();
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
        getDetail();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!attendanceDetail) getDetail();
    // navigator.geolocation.getCurrentPosition(
    //   successHandler,
    //   (err) => {
    //     console.log(err);
    //   },
    //   { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    // );
  }, [attendanceDetail]);

  return (
    <>
      {isModalCenterOpen && (
        <ModalCenter
          title='알림'
          closeModal={() => setModalCenterOpen(false)}
          confirmAction={() => setModalCenterOpen(false)}
        >
          <div>{modalMsg}</div>
        </ModalCenter>
      )}
      {attendanceDetail && (
        <Frame navTitle='알바ON'>
          <div className='w-full flex flex-col'>
            <ReturnArrow To='/attendance' />
            <Wrapper className='gap-3'>
              {code ? (
                <WorkPlaceName
                  name={attendanceDetail.workPlaceName}
                  colorType={code}
                  textSlide
                  wide
                />
              ) : (
                <PulseWorkPlace />
              )}
              {/* 지도 */}
              <div className='bg-white rounded-md border h-[200px]'>
                <Map
                  center={{ lat: location.latitude, lng: location.longitude }}
                  style={{ width: '100%', height: '100%' }}
                  level={3}
                  onCreate={(map) => {
                    const bounds = new kakao.maps.LatLngBounds();
                    bounds.extend(
                      new kakao.maps.LatLng(
                        location.latitude,
                        location.longitude
                      )
                    );
                    bounds.extend(
                      new kakao.maps.LatLng(
                        attendanceDetail.location.lat,
                        attendanceDetail.location.lng
                      )
                    );
                    map.setBounds(bounds);
                  }}
                >
                  <MapMarker
                    position={{
                      lat: location.latitude,
                      lng: location.longitude,
                    }}
                  ></MapMarker>
                  <MapMarker
                    position={{
                      lat: attendanceDetail.location.lat,
                      lng: attendanceDetail.location.lng,
                    }}
                  >
                    <div>{attendanceDetail.workPlaceName}</div>
                  </MapMarker>
                </Map>
              </div>
              {/* 근무요일 */}
              <WhiteBox title='근무요일' border className='py-3 min-h-[110px]'>
                <div className='flex justify-between mt-5'>
                  {workingDay?.map((item, index) => (
                    <div
                      key={item.day || index}
                      className='flex flex-col items-center'
                    >
                      <div
                        className={clsx(
                          'flex justify-center items-center rounded-sm  w-[30px] h-[30px]',
                          {
                            'bg-hanaLightGreen text-white font-bold ':
                              item.isWorkDay,
                          }
                        )}
                      >
                        {days[index]}
                      </div>
                      <div className='flex flex-col gap-0 text-sm mt-2'>
                        <div>{item.start}</div>
                        <div>{item.end}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </WhiteBox>
              <BtnPrimary
                text='출근'
                action={() =>
                  openModal(
                    '출석할 수 없습니다.\n 가까운 위치에서 다시 시도해주세요'
                  )
                }
                className='py-4'
              ></BtnPrimary>
            </Wrapper>
            <Wrapper title='공지사항' className='mt-10'>
              <div className='flex flex-col gap-2'>
                {attendanceDetail && attendanceDetail.notice.length > 0 ? (
                  attendanceDetail.notice?.map((item) => (
                    <WhiteBox
                      key={item.notificationId}
                      title={item.title}
                      border
                      className='py-3'
                    >
                      <div className='text-start text-sm'>{item.content}</div>
                    </WhiteBox>
                  ))
                ) : (
                  <WhiteBox>
                    <div className='flex h-[55px] items-center justify-center text-gray-500 text-sm'>
                      공지사항이 없습니다
                    </div>
                  </WhiteBox>
                )}
              </div>
            </Wrapper>
          </div>
        </Frame>
      )}
    </>
  );
};

export default AttendanceDetail;
