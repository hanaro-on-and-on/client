import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import Frame from '../../../components/Frame';

import NavToggle from '../../../components/NavToggle';
import PayStub from './PayStub';

import WorkHourManagement from './WorkHourManagement';
import generateMonthList from '../../../utils/generateMonthList';
import { useDate } from '../../../contexts/Date-Context';
import ApiClient from '../../../api/apiClient';

enum ToggleStatus {
  PAYMENT = 'payment',
  WORKTIME = 'worktime',
}

const PaymentDetail = () => {
  const [workPlaceInfo, setWorkPlaceInfo] = useState<WorkPlaceInfo | null>(
    null
  );
  const today = new Date();
  const { workPlace, yearMonth, id, connected } = useParams();
  const [selectedToggle, setSelectedToggle] = useState<ToggleStatus>(
    ToggleStatus.PAYMENT
  );

  const { date, setYear, setMonth, setYearMonth, getYear, getMonth } =
    useDate();

  const [monthList, setMonthList] = useState<Date[]>(() => generateMonthList());

  //매장 정보
  const getWorkPlaceData = async () => {
    try {
      const response = await ApiClient.getInstance().employeeGetWorkPlaceInfo(
        +id!
      );
      setWorkPlaceInfo(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomWorkPlaceData = async () => {
    try {
      const response =
        await ApiClient.getInstance().employeeGetCustomWorkPlaceInfo(+id!);

      if (response)
        setWorkPlaceInfo({
          workPlaceEmployeeId: null,
          workPlaceNm: response.workPlaceNm,
          colorTypeCd: response.colorTypeCd,
          workStartDate: null,
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (connected != undefined) {
      if (connected === 'true') getWorkPlaceData();
      else getCustomWorkPlaceData();
    }
  }, []);

  return (
    <Frame navTitle='알바ON'>
      <div className='w-full pt-3'>
        {workPlace && (
          <div className='flex flex-col gap-2'>
            {/* 뒤로 가기 */}
            <ReturnArrow text='목록' To='/part-time/payment' />

            {/* 매장명 */}
            <WhiteBox className='py-3 px-3 w-full border '>
              <div className='flex justify-between items-center'>
                {workPlaceInfo && (
                  <WorkPlaceName
                    name={workPlaceInfo.workPlaceNm}
                    colorType={workPlaceInfo.colorTypeCd}
                  />
                )}
                <div className='flex gap-2 text-[12px]'>
                  {workPlaceInfo?.workStartDate && (
                    <div>
                      근무 시작일
                      <div className='text-[12px]'>
                        {workPlaceInfo?.workStartDate}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </WhiteBox>

            {/* 토글버튼 */}
            <NavToggle
              first='급여 명세서'
              second='근무 내역'
              firstSelected={() => setSelectedToggle(ToggleStatus.PAYMENT)}
              secondSelected={() => setSelectedToggle(ToggleStatus.WORKTIME)}
            />

            {/* 급여명세서 */}
            {selectedToggle === ToggleStatus.PAYMENT &&
              connected != undefined && (
                <PayStub
                  year={getYear()}
                  month={getMonth()}
                  id={Number(id)}
                  monthList={monthList}
                  isConnected={connected}
                />
              )}
            {selectedToggle === ToggleStatus.WORKTIME &&
              connected != undefined && (
                <WorkHourManagement
                  year={getYear()}
                  month={getMonth()}
                  id={Number(id)}
                  monthList={monthList}
                  isConnected={connected}
                />
              )}
          </div>
        )}
      </div>
    </Frame>
  );
};

export default PaymentDetail;
