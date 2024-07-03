import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import { ChangeEvent } from 'react';
import { formatMonths, styleMonths } from '../../../utils/format-date';

type Prop = {
  monthList: Date[];
  selectedDate: Date;
  selectDate: React.Dispatch<Date>;
};

const WorkHourManagement = ({ monthList, selectedDate, selectDate }: Prop) => {
  const navigate = useNavigate();

  return (
    <>
      {selectedDate.getMonth() + 1 && (
        <WhiteBox className='w-full py-5' border>
          <div>
            <select
              value={selectedDate.toString()}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                selectDate(new Date(e.target.value));
              }}
            >
              {monthList.map((date) => (
                <option
                  selected={selectedDate === date}
                  key={date.toISOString()}
                  value={date.toString()}
                >
                  {`${styleMonths(formatMonths(date))} 근무내역`}
                </option>
              ))}
            </select>
          </div>
        </WhiteBox>
      )}
    </>
  );
};

export default WorkHourManagement;
