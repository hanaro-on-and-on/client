/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Frame from '../../components/Frame';
import WhiteBox from '../../components/ui/WhiteBox';
import BtnBorder from '../../components/BtnBorder';
import BtnBottom from '../../components/BtnBottom';
import { usePlace } from '../../contexts/Place-Context';
import ApiClient from '../../api/apiClient';
import { FirstInfo, PlaceFirstInfo } from '../../types/contract';
import { useNavigate } from 'react-router-dom';

type MarkerProp = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

const AddWorkPlace = () => {
  const { firstInfo } = usePlace();
  const [address, setAddress] = useState(firstInfo ? firstInfo.address : '');
  const navigate = useNavigate();

  const [info, setInfo] = useState<MarkerProp | null>(null);
  const [markers, setMarkers] = useState<MarkerProp[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [selected, setSelected] = useState<boolean>(false);
  const [add, setAdd] = useState<string>('');

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 0, latitude: 0 });

  const successHandler = (response: any) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const fetchPlace = async (firstInfo: PlaceFirstInfo, info: MarkerProp) => {
    try {
      const location = { lat: info.position.lat, lng: info.position.lng };
      const response = await ApiClient.getInstance().registerWorkPlace({
        location,
        ...firstInfo,
      });
      console.log('API 호출 결과:', response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const onClickConfirm = async () => {
    if (firstInfo && info) {
      const response = await fetchPlace(firstInfo, info);
      navigate('/owner/myWorkPlaces');
    }
  };

  useEffect(() => {
    if (info) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        info!.position.lng,
        info!.position.lat,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const addr = result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            // 클릭한 위치 주소를 가져온다.
            console.log(addr);
            setAdd(addr);
          }
        }
      );

      setSelected(true);
    }
  }, [info]);

  //   키워드 검색
  useEffect(() => {
    if (!keyword) return;
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  //   현재 위치
  useEffect(() => {
    if (!map) return;
    navigator.geolocation.getCurrentPosition(
      successHandler,
      (err) => {
        console.log(err);
      },
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );

    // window.kakao.maps.event.addListener(
    //   map,
    //   'click',
    //   function (mouseEvent: any) {
    //     // 주소-좌표 변환 객체를 생성합니다
    //     const geocoder = new window.kakao.maps.services.Geocoder();

    //     geocoder.coord2Address(
    //       mouseEvent.latLng.getLng(),
    //       mouseEvent.latLng.getLat(),
    //       (result: any, status: any) => {
    //         if (status === window.kakao.maps.services.Status.OK) {
    //           const addr = result[0].road_address
    //             ? result[0].road_address.address_name
    //             : result[0].address.address_name;

    //           // 클릭한 위치 주소를 가져온다.
    //           console.log(addr);
    //         }
    //       }
    //     );
    //   }
    // );
  }, [map]);

  return (
    <Frame navTitle='사장ON'>
      <div className='w-full flex flex-col'>
        {firstInfo && (
          <h2 className='text-lg p-2'>
            <span className='text-2xl underline'>{firstInfo.workPlaceNm}</span>
            {` 사업장을 등록할까요?`}
          </h2>
        )}

        <WhiteBox border className='py-3 px-3 mt-5' title='사업장 위치 등록'>
          <div className='flex flex-col gap-5 w-full'>
            <Map // 로드뷰를 표시할 Container
              center={{
                lat: location.latitude,
                lng: location.longitude,
              }}
              className='w-full h-[300px] mt-5'
              level={3}
              onCreate={setMap}
            >
              {markers.map((marker) => (
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => {
                    setInfo(marker);
                  }}
                >
                  {info && info.content === marker.content && (
                    <div className='self-center text-center line-clamp-1 w-full'>
                      {marker.content}
                    </div>
                  )}
                </MapMarker>
              ))}
            </Map>

            <div className=' grid grid-cols-10 justify-between pb-1'>
              <input
                value={address}
                // ref={keywordRef}
                onChange={(e) => setAddress(e.target.value)}
                className='col-span-8 w-full border-b-2 border-hanaLightGreen px-1 focus:outline-none'
              />
              <div className='col-span-2'>
                <BtnBorder
                  color='green'
                  text='검색'
                  onClick={() => setKeyword(address)}
                  // onClick={() => setKeyword(keywordRef.current?.value || '')}
                />
              </div>
            </div>
          </div>
        </WhiteBox>
        {selected && (
          <WhiteBox title={add} border className='mt-5 py-3 px-2'>
            <div className='flex flex-col gap-2'>
              <div className='text-gray-400 text-sm text-start'>
                {'검색한 사업장의 위치를 저장할까요?'}
              </div>
              <BtnBottom text='등록' action={onClickConfirm} />
            </div>
          </WhiteBox>
        )}
      </div>
    </Frame>
  );
};

export default AddWorkPlace;
