import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../api/apiClient';
import generateMonthList from '../../utils/generateMonthList';
import ModalBottom from '../ModalBottom';
import SignPad from '../SignPad';
import WhiteBox from '../ui/WhiteBox';
import { formatMonths, styleMonths } from '../../utils/format-date';
import BtnGray from '../BtnGray';
import BtnPrimary from '../BtnPrimary';
import Circle from '../ui/Circle';
import { HStack } from '../ui/Stack';

type Prop = {
  year: number;
  month: number;
  workPlaceEmployeeId: number | undefined;
};

const textConvert = (status: string): string => {
  if (status === 'READY') return '간편 지급';
  if (status === 'SIGN') return '수령 받기';
  if (status === 'WAITING') return '수령 대기';
  if (status === 'COMPLETED') return '수령 완료';

  return '';
};

const OwnerPayStub = ({ year, month, workPlaceEmployeeId }: Prop) => {
  const navigation = useNavigate();
  const [monthList, setMonthList] = useState<Date[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  //급여 명세서
  const [payStub, setPayStub] = useState<EmployeePayStubGetResponse | null>(
    null
  );

  //모달
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');

  //서명
  const [getSign, setGetsign] = useState<boolean>(false);
  const signRef = useRef<SignPadHandler>(null);

  const setSelectedYearMonth = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (msg?: string) => {
    setModalMsg(msg || '');
    setIsModalOpen(true);
  };

  const signature = async (payStubId: number) => {
    const sign: [] = signRef.current?.canvasRef.current.toData();
    console.log(sign);
    if (!sign) return;
    try {
      const response: EmployeeSignatureResponse =
        await ApiClient.getInstance().employeeSignature(payStubId);
      if (response) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    if (!workPlaceEmployeeId) return;
    try {
      const response = await ApiClient.getInstance().employeeGetPayStub(
        workPlaceEmployeeId,
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
      {isModalOpen && payStub && (
        <ModalBottom
          title='전자 서명 동의'
          closeModal={closeModal}
          btnText='동의후 서명 시작'
          btnBottom={!getSign}
          action={() => setGetsign(true)}
        >
          <div>
            {!getSign ? (
              <>{modalMsg}</>
            ) : (
              <SignPad
                ref={signRef}
                submit={() => signature(payStub.payStubId)}
              />
            )}
          </div>
        </ModalBottom>
      )}
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
            <div className='flex text-sm text-gray-500 text-start gap-1'>
              <span>월급날:</span>
              <span>{payStub.paymentDay}일</span>
            </div>
            <div className='text-xl font-bold'>
              총 급여 : {payStub.totalPay.toLocaleString()} 원
            </div>
          </div>
          {payStub.status === 'SIGN' ? (
            <BtnPrimary
              text={textConvert(payStub.status)}
              action={() =>
                openModal('급여 수령을 위한 전자 서명을 시작하시겠습니까?')
              }
              className='w-full my-2'
            />
          ) : (
            <BtnGray
              text={textConvert(payStub.status)}
              action={() => {}}
              className='w-full my-2'
              disabled
            />
          )}

          {/* 지급 합계 */}
          <div className='flex flex-col border-t border-gray-100 py-5 gap-2'>
            <HStack className='text-start justify-between mb-3'>
              <span className='font-bold'>지급 합계</span>
              <span className='font-semibold'>
                {(
                  payStub.basicHour * payStub.basicPay +
                  payStub.overHour * payStub.overPay
                ).toLocaleString()}
                원
              </span>
            </HStack>
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

export default OwnerPayStub;
