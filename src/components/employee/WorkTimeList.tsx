import { useState } from 'react';
import WhiteBox from '../ui/WhiteBox';
import WorkPlaceName from '../ui/WorkPlaceName';
import getTimeGap from '../../utils/get-time-gap';
import ColorTag from '../ui/ColorTag';

type Prop = {
  workPlaceNm: string;
  PlaceId: number;
  colorTypeCd: string;
  works: WorkListWorkTime[];
};

const getYear = (date: string): string => {
  return date.substring(0, 4);
};
const getDate = (date: string): string => {
  const m = date.substring(4, 6);
  const d = date.substring(6);
  return `${m}월 ${d}일`;
};

const getH = (date: string | Date) => {
  const time = new Date(date).getHours();
  return time === 0 ? '00' : time;
};

const getMin = (date: Date | string) => {
  const min = new Date(date).getMinutes();
  return min === 0 ? '00' : min;
};

const formatTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
};

const WorkTimeList = ({ workPlaceNm, PlaceId, colorTypeCd, works }: Prop) => {
  const [workPlaceId, setWorkPlaceList] = useState<number>(() => PlaceId);

  return (
    <>
      {works?.map((item) => (
        <WhiteBox key={item.workDay} border>
          <div className='flex flex-col gap-1 py-2'>
            <div className='flex justify-between'>
              <WorkPlaceName
                textSmall
                name={workPlaceNm}
                colorType={colorTypeCd}
              />
              <div>
                <ColorTag className='bg-hanaLightGreen text-white font-semibold'>
                  {formatTime(getTimeGap(item.startTime, item.endTime))}
                </ColorTag>
              </div>
            </div>

            <div className='max-h-[300px] flex justify-between'>
              <div className='text-start font-semibold'>
                {getYear(item.workDay)} {getDate(item.workDay)}
              </div>
              <div className='text-end flex flex-col'>
                {getH(item.startTime)}:{getMin(item.startTime)} -{' '}
                {getH(item.endTime)}:{getMin(item.endTime)}
              </div>
            </div>
          </div>
        </WhiteBox>
      ))}
    </>
  );
};

export default WorkTimeList;
