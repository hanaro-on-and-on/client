import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Frame from '../../components/Frame';
import WhiteBox from '../../components/ui/WhiteBox';
import BtnBorder from '../../components/BtnBorder';
import BtnBottom from '../../components/BtnBottom';

type MarkerProp = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

const AddWorkPlace = () => {
  const [info, setInfo] = useState<MarkerProp | null>(null);
  const [markers, setMarkers] = useState<MarkerProp[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const keywordRef = useRef<HTMLInputElement | null>(null);
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
                ref={keywordRef}
                className='col-span-8 w-full border-b-2 border-hanaLightGreen px-1 focus:outline-none'
              />
              <div className='col-span-2'>
                <BtnBorder
                  color='green'
                  text='검색'
                  onClick={() => setKeyword(keywordRef.current?.value || '')}
                />
              </div>
            </div>
          </div>
        </WhiteBox>
        {selected && (
          <WhiteBox
            title={`${info?.content} 를 등록하시겠습니까?`}
            border
            className='mt-5 py-3 px-2'
          >
            <div className='flex flex-col gap-2'>
              <div className='text-gray-400 text-sm text-start'>{add}</div>
              <BtnBottom text='등록' action={() => {}} />
            </div>
          </WhiteBox>
        )}
      </div>
    </Frame>
  );
};

export default AddWorkPlace;
