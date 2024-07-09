import ColorTag from '../ui/ColorTag';
import WhiteBox from '../ui/WhiteBox';
import WorkPlaceName from '../ui/WorkPlaceName';

type Prop = {
  scheduleInfo: ScheduleInfo;
};

type ScheduleInfo = {
  id: number;
  workPlaceName: string; //
  workPlaceColorCode: string; //
  attendDate: string;
  startTime: Date;
  endDate: Date;
  payment: number;
  isConnected?: boolean;
  restMinute?: number;
  attendanceType?: string;
};

const DetailWorkInfo = ({ scheduleInfo }: Prop) => {
  const dateConvert = (date: string) => {
    const year = +date.substring(0, 4);
    const month = +date.substring(4, 6);
    const day = +date.substring(6);

    // const dat = new Date();
    // dat.setFullYear(+year);
    // dat.setMonth(+month);
    // dat.setDate(+day);

    return { year, month, day };
  };

  const dateFormat = ({
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  }) => {
    return `${year}.${month === 0 ? '00' : month}.${day === 0 ? '00' : day}`;
  };

  return (
    <>
      <WhiteBox border className='w-full'>
        <div className='flex flex-col gap-5 px-2 py-5 w-full'>
          <div className='flex justify-between'>
            <WorkPlaceName
              name={scheduleInfo.workPlaceName}
              colorType={scheduleInfo.workPlaceColorCode}
            />
            <div>
              {scheduleInfo.attendanceType === 'REAL' && (
                <ColorTag className='bg-pink-100 text-black'>
                  출석 완료
                </ColorTag>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-5 '>
            <div className='flex justify-between'>
              <div className='font-semibold text-start'>근무일자</div>
              <div className='text-end'>
                {dateFormat(dateConvert(scheduleInfo.attendDate))}
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='font-semibold text-start'>시급</div>
              <div className='text-end'>
                {scheduleInfo.payment.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      </WhiteBox>
    </>
  );
};

export default DetailWorkInfo;
