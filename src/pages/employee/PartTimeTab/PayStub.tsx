import { useEffect, useState } from 'react';
import WhiteBox from '../../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import BtnGray from '../../../components/BtnGray';
import Circle from '../../../components/ui/Circle';
import ApiClient from '../../../api/apiClient';
import generateMonthList from '../../../utils/generateMonthList';

type Prop = {
  year: number;
  month: number;
};

const PayStub = ({ year, month }: Prop) => {
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const setSelectedYearMonth = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const getData = async () => {
    try {
      const response = await ApiClient.getInstance().employeeGetPayStub(
        '1',
        selectedYear,
        selectedMonth
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    setMonthList(generateMonthList());
  }, []);

  return (
    <>
      <WhiteBox className='py-3 px-3 w-full border'>
        <select>
          {monthList.map((date) => (
            <option
              key={date.toISOString()}
              value={date.toLocaleDateString()}
              defaultChecked={
                date.getFullYear() === year && date.getMonth() === month
              }
              onSelect={() =>
                setSelectedYearMonth(date.getFullYear(), date.getMonth())
              }
            >
              {`${styleMonths(formatMonths(date))} 예상 급여명세서`}
            </option>
          ))}
        </select>
        <div className='flex justify-between items-end mt-5'>
          <div className='flex flex-col text-sm text-gray-300 text-start'>
            <span>월급일</span>
            <span>날짜</span>
          </div>
          <div className='text-xl font-bold'>총 1000원</div>
        </div>
        <BtnGray text='수령예정' action={() => {}} className='w-full my-2' />
        {/* 지급 합계 */}
        <div className='flex flex-col border-t border-gray-100 py-5'>
          <div className='text-start flex justify-between mb-3'>
            <span className='font-bold'>지급 합계</span>
            <span className='font-semibold'>1000원</span>
          </div>
          <div className='grid grid-cols-12 justify-between items-start'>
            <div className='col-span-1'>
              <Circle color='red' />
            </div>
            <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
              <div>근무수당</div>
              <div className='flex justify-between  text-gray-400'>
                <div>10,900원 * 10H </div>
                <div>100,000원</div>
              </div>
            </div>
          </div>
        </div>
        {/* 공제 합계 */}
        <div className='flex flex-col border-t border-gray-100 py-5'>
          <div className='text-start flex justify-between mb-3'>
            <span className='font-bold'>공제 합계</span>
            <span className='font-semibold'>1000원</span>
          </div>
          <div className='grid grid-cols-12 justify-between items-start'>
            <div className='col-span-1'>
              <Circle color='blue' />
            </div>
            <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
              <div>근무수당</div>
              <div className='flex justify-between text-gray-400'>
                <div>10,900원 * 10H </div>
                <div>100,000원</div>
              </div>
            </div>
          </div>
        </div>
      </WhiteBox>
    </>
  );
};

export default PayStub;
