import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import ApiClient from '../../../api/apiClient';

type Prop = {
  monthList: Date[];
  selectedDate: Date;
  selectDate: React.Dispatch<Date>;
};

const Payment = ({ monthList, selectedDate, selectDate }: Prop) => {
  const today = new Date();
  const navigate = useNavigate();

  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [paymentList, setPaymentList] = useState<
    EmployeeSalaryGetResponseList[]
  >([]);

  const fetchData = async (year: number, month: number) => {
    try {
      const response: MonthlyPayment =
        await ApiClient.getInstance().getMonthlyPayment(year, month);

      if (response) {
        console.log(response.list);
        setTotalMonthlyPayment(response.totalPayment);
        setPaymentList(response.list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    }
  }, [selectedDate]);

  return (
    <>
      {/* 총금액, 날짜 */}
      <WhiteBox className='w-full py-5' border>
        {selectedDate.getMonth() + 1 && (
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
                  {`${styleMonths(formatMonths(date))} 총 급여`}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className='font-bold text-2xl pt-5'>
          {totalMonthlyPayment.toLocaleString()} 원
        </div>
      </WhiteBox>
      <div className='w-full flex flex-col gap-1'>
        {/* 매장 목록 */}
        {paymentList.map((item, index) => {
          return (
            <WhiteBox
              key={item.workPlaceName + String(index)}
              border
              className='w-full '
            >
              <button
                type='button'
                onClick={() =>
                  navigate(
                    `/part-time/payment/detail/${selectedDate.getFullYear()}-${selectedDate.getMonth()}` +
                      `/${item.workPlaceName}`
                  )
                }
                className='flex justify-between items-center w-full bg-transparent py-4'
              >
                <WorkPlaceName
                  name={item.workPlaceName}
                  colorType={item.workPlaceColor}
                />
                <div className='flex items-center gap-1'>
                  {item.payment.toLocaleString()}
                  <FaAngleRight />
                </div>
              </button>
            </WhiteBox>
          );
        })}
      </div>
    </>
  );
};

export default Payment;
