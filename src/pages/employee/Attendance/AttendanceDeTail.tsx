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
const { kakao } = window;

const days = ['일', '월', '화', '수', '목', '금', '토', '일'];

const AttendanceDetail = () => {
  const { workPlaceId } = useParams();
  const [workingDay, setWorkingDay] = useState<
    {
      day: null | string;
      start: null | string;
      end: null | string;
      isWorkDay: boolean;
    }[]
  >([]);

  const [attendanceDetail, setAttendaceDetail] =
    useState<EmployeeAttendanceDetail | null>(null);
  const [location, setLoacation] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 0, latitude: 0 });

  const successHandler = (response: any) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const getDetail = async () => {
    if (!workPlaceId) return;
    try {
      const response: EmployeeAttendanceDetail =
        await ApiClient.getInstance().employeeGetAttendanceDetail(+workPlaceId);
      setAttendaceDetail(response);
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

  useEffect(() => {
    if (!attendanceDetail) getDetail();
    navigator.geolocation.getCurrentPosition(
      successHandler,
      (err) => {
        console.log(err);
      },
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );
  }, [attendanceDetail]);

  return (
    <>
      {attendanceDetail && (
        <Frame navTitle='알바ON'>
          <div className='w-full flex flex-col mt-5 pb-10'>
            <ReturnArrow To='/attendance' />
            <Wrapper className='gap-3'>
              <WorkPlaceName
                name={attendanceDetail.workPlaceName}
                colorType={attendanceDetail.colorTypeCode}
              />
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
            </Wrapper>
            <Wrapper title='공지사항' className='mt-10'>
              <div className='flex flex-col gap-2'>
                {attendanceDetail.notice?.map((item) => (
                  <WhiteBox
                    key={item.notificationId}
                    title={item.title}
                    border
                    className='py-3'
                  >
                    <div className='text-start text-sm'>{item.content}</div>
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

export default AttendanceDetail;
