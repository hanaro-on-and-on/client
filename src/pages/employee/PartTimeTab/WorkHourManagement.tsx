import WhiteBox from '../../../components/ui/WhiteBox';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDate } from '../../../contexts/Date-Context';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import ApiClient from '../../../api/apiClient';
import WorkTimeList from '../../../components/employee/WorkTimeList';
import getTimeGap from '../../../utils/get-time-gap';

type Prop = {
  year: number;
  month: number;
  id: number;
  monthList: Date[];
};

const WorkHourManagement = ({ year, month, id, monthList }: Prop) => {
  const { date, setYearMonth } = useDate();

  const [connectedList, setConnectedList] =
    useState<EmployeeWorkTimeListConnected | null>(null);

  const fetchConnData = async () => {
    try {
      const response =
        await ApiClient.getInstance().employeeGetWorkTimeListConnected(
          id,
          year,
          month
        );
      console.log('conn res', response);

      setConnectedList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalWorktime = (): number => {
    let total = 0;
    connectedList?.works?.forEach(
      (item) => (total += getTimeGap(item.startTime, item.endTime))
    );

    return total;
  };

  const formatTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
  };

  useEffect(() => {
    fetchConnData();
  }, []);

  return (
    <>
      {month && (
        <>
          <WhiteBox className='py-3 px-3 w-full border'>
            <div>
              <select
                defaultValue={date.toString()}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const sel = new Date(e.target.value);
                  setYearMonth(sel);
                }}
              >
                {monthList.map((dat) => (
                  <option
                    selected={date === dat}
                    key={dat.toISOString()}
                    value={dat.toString()}
                  >
                    {`${styleMonths(formatMonths(dat))} 근무 내역`}
                  </option>
                ))}
              </select>
              {connectedList && (
                <div className='text-2xl font-bold pt-3'>
                  {formatTime(getTotalWorktime())}
                </div>
              )}
            </div>
          </WhiteBox>
          {connectedList && (
            <WorkTimeList
              key={connectedList.PlaceId}
              PlaceId={connectedList.PlaceId}
              workPlaceNm={connectedList.workPlaceNm}
              colorTypeCd={connectedList.workPlaceColor}
              works={connectedList.works}
            />
          )}
        </>
      )}
    </>
  );
};

export default WorkHourManagement;
