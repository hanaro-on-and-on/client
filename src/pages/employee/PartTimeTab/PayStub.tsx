import { useEffect, useState } from 'react';
import WhiteBox from '../../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import BtnGray from '../../../components/BtnGray';
import Circle from '../../../components/ui/Circle';
import ApiClient from '../../../api/apiClient';
import generateMonthList from '../../../utils/generateMonthList';
import BtnPrimary from '../../../components/BtnPrimary';

type Prop = {
  year: number;
  month: number;
};

const PayStub = ({ year, month }: Prop) => {
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [payStub, setPayStub] = useState<EmployeePayStubGetResponse>(null);

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

      if (response) {
        console.log(response);
        setPayStub(response);
      }
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
      {payStub && (
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
              <span>{payStub.paymentDay}일</span>
            </div>
            <div className='text-xl font-bold'>
              총 {payStub.totalPay.toLocaleString()}
            </div>
          </div>
          {payStub.status !== 'READY' ? (
            <BtnPrimary
              text='수령 받기'
              action={() => {}}
              className='w-full my-2'
            />
          ) : (
            <BtnGray
              text='수령예정'
              action={() => {}}
              className='w-full my-2'
            />
          )}

          {/* 지급 합계 */}
          <div className='flex flex-col border-t border-gray-100 py-5 gap-2'>
            <div className='text-start flex justify-between mb-3'>
              <span className='font-bold'>지급 합계</span>
              <span className='font-semibold'>
                {(
                  payStub.basicHour * payStub.basicPay +
                  payStub.overHour * payStub.overPay
                ).toLocaleString()}
                원
              </span>
            </div>
            {/* 근무수당 */}
            <div className='grid grid-cols-12 justify-between items-start'>
              <div className='col-span-1'>
                <Circle color='red' />
              </div>
              <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                <div>근무수당</div>
                <div className='flex justify-between  text-gray-400'>
                  <div>
                    {payStub.basicPay.toLocaleString()}원 * {payStub.basicHour}H
                  </div>
                  <div>
                    {(payStub.basicHour * payStub.basicPay).toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
            {/* 추가 근무 수당 */}
            <div className='grid grid-cols-12 justify-between items-start'>
              <div className='col-span-1'>
                <Circle color='red' />
              </div>
              <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                <div>추가수당</div>
                <div className='flex justify-between  text-gray-400'>
                  <div>
                    {payStub.overPay.toLocaleString()}원 * {payStub.overHour}H
                  </div>
                  <div>
                    {(payStub.overPay * payStub.overHour).toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
            {/* 주휴 수당 */}
            {payStub.weeklyHolidayTime > 0 && (
              <div className='grid grid-cols-12 justify-between items-start'>
                <div className='col-span-1'>
                  <Circle color='red' />
                </div>
                <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                  <div>주휴수당</div>
                  <div className='flex justify-between  text-gray-400'>
                    <div>
                      {payStub.weeklyHolidayPay.toLocaleString()}원 *
                      {payStub.weeklyHolidayTime}H
                    </div>
                    <div>
                      {(
                        payStub.weeklyHolidayTime * payStub.weeklyHolidayPay
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 공제 합계 */}
          <div className='flex flex-col border-t border-gray-100 py-5'>
            <div className='text-start flex justify-between mb-3'>
              <span className='font-bold'>공제 합계</span>
              <span className='font-semibold'>
                {payStub.totalTaxPay.toLocaleString()}원
              </span>
            </div>
            <div className='grid grid-cols-12 justify-between items-start'>
              <div className='col-span-1'>
                <Circle color='blue' />
              </div>
              <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                <div>세금</div>
                <div className='flex justify-between text-gray-400'>
                  <div>세율 {payStub.taxRate} </div>
                  <div>{payStub.totalPay.toLocaleString()}원</div>
                </div>
              </div>
            </div>
          </div>
        </WhiteBox>
      )}
    </>
  );
};

export default PayStub;
