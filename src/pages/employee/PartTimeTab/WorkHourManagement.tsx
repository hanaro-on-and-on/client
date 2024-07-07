import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDate } from '../../../contexts/Date-Context';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import ApiClient from '../../../api/apiClient';

type Prop = {
  year: number;
  month: number;
  id: number;
  monthList: Date[];
};

const WorkHourManagement = ({ year, month, id, monthList }: Prop) => {
  const navigate = useNavigate();
  const { date, setYearMonth } = useDate();

  const [connectedList, setConnectedList] = useState<WorkListWorkTime[]>([]);
  const [worktimeList, setWorkTimeList] = useState<WorkListWorkTime[]>([]);

  const fetchConnData = async () => {
    try {
      const response =
        await ApiClient.getInstance().employeeGetWorkTimeListConnected(
          id,
          year,
          month
        );
      console.log('conn res', response);

      setConnectedList(response.works);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await ApiClient.getInstance().employeeGetWorkTimeList(
        id,
        year,
        month
      );
      console.log('res', response);

      setWorkTimeList(response.works);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnData();
    fetchData();
  }, []);

  return (
    <>
      {month && (
        <WhiteBox className='py-3 px-3 w-full border'>
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
        </WhiteBox>
      )}
    </>
  );
};

export default WorkHourManagement;
