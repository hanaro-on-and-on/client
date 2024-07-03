import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import { ChangeEvent } from 'react';
import { useDate } from '../../../contexts/Date-Context';
import { formatMonths, styleMonths } from '../../../utils/format-date';

type Prop = {
  year: number;
  month: number;
  id: number;
  monthList: Date[];
};

const WorkHourManagement = ({ year, month, id, monthList }: Prop) => {
  const navigate = useNavigate();
  const { date, setYearMonth } = useDate();

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
