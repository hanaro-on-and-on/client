import { ChangeEvent, useEffect, useRef, useState } from 'react';
import WhiteBox from '../../../components/ui/WhiteBox';
import { formatMonths, styleMonths } from '../../../utils/format-date';
import BtnGray from '../../../components/BtnGray';
import Circle from '../../../components/ui/Circle';
import ApiClient from '../../../api/apiClient';
import BtnPrimary from '../../../components/BtnPrimary';
import ModalBottom from '../../../components/ModalBottom';
import SignPad from '../../../components/SignPad';
import { useDate } from '../../../contexts/Date-Context';

type Prop = {
  monthList: Date[];
  year: number;
  month: number;
  id: number;
  isConnected: string;
};

const textConvert = (status: string): string => {
  if (status === 'READY') return '간편 지급';
  if (status === 'SIGN') return '수령 받기';
  if (status === 'WAITING') return '수령 대기';
  if (status === 'COMPLETED') return '수령 완료';

  return '수령 불가';
};

const PayStub = ({ monthList, year, month, id, isConnected }: Prop) => {
  const [workPlaceInfo, setWorkPlaceInfo] = useState<WorkPlaceInfo | null>(
    null
  );
  const { date, setYear, setMonth, setYearMonth, getYear, getMonth } =
    useDate();

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (msg?: string) => {
    setModalMsg(msg || '');
    setIsModalOpen(true);
  };

  //서명 요청
  const signature = async (id: number) => {
    const sign: [] = signRef.current?.canvasRef.current.toData();
    if (!sign) return;
    try {
      const response: EmployeeSignatureResponse =
        await ApiClient.getInstance().employeeSignature(id);
      if (response) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //급여 명세서 정보 가져오기
  const getData = async () => {
    if (!id) return;
    console.log('id', id);
    try {
      const response =
        isConnected === 'true'
          ? await ApiClient.getInstance().employeeGetPayStub(
              id,
              getYear(),
              getMonth()
            )
          : await ApiClient.getInstance().employeeGetCustomPayStub(
              id,
              getYear(),
              getMonth()
            );

      console.log('res', response);
      if (response) {
        setPayStub(response);
      }
    } catch (err) {
      console.log(err);
      setPayStub(null);
    }
  };

  useEffect(() => {
    getData();
  }, [date]);

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
              {`${styleMonths(formatMonths(dat))} 예상 급여 명세서`}
            </option>
          ))}
        </select>
        {payStub && (
          <div className='flex justify-between items-end mt-5'>
            <div className='flex flex-col text-sm text-gray-300 text-start'>
              {payStub.paymentDay && (
                <>
                  <span>월급일</span>
                  <span>{payStub.paymentDay}일</span>
                </>
              )}
            </div>
            <div className='text-xl font-bold'>
              총 {payStub.totalPay.toLocaleString()}
            </div>
          </div>
        )}
        {payStub && payStub.status === 'READY' && (
          <BtnPrimary
            text={textConvert(payStub.status)}
            action={() =>
              openModal('급여 수령을 위한 전자 서명을 시작하시겠습니까?')
            }
            className='w-full my-2'
          />
        )}
        {payStub && payStub.status !== 'READY' && (
          <BtnGray
            text={textConvert(payStub?.status)}
            action={() => {}}
            className='w-full my-2'
            disabled
          />
        )}

        {!payStub && (
          <div className='text-gray-300 mt-10'>
            급여 명세서가 존재하지 않습니다
          </div>
        )}
        {payStub && (
          <>
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
                      {payStub.basicPay.toLocaleString()}원 *{' '}
                      {payStub.basicHour}H
                    </div>
                    <div>
                      {(payStub.basicHour * payStub.basicPay).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
              </div>
              {/* 추가 근무 수당 */}
              {payStub.overPay && (
                <div className='grid grid-cols-12 justify-between items-start'>
                  <div className='col-span-1'>
                    <Circle color='red' />
                  </div>
                  <div className='col-span-11 flex flex-col justify-start text-start pl-3'>
                    <div>추가수당</div>
                    <div className='flex justify-between  text-gray-400'>
                      <div>
                        {payStub.overPay.toLocaleString()}원 *{' '}
                        {payStub.overHour}H
                      </div>
                      <div>
                        {(payStub.overPay * payStub.overHour).toLocaleString()}
                        원
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
          </>
        )}
        {/* 지급 합계 */}
      </WhiteBox>
    </>
  );
};

export default PayStub;
