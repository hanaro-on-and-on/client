import { useNavigate } from 'react-router-dom';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import { useEffect, useState } from 'react';
import ApiClient from '../../../api/apiClient';
import ModalBottom from '../../../components/ModalBottom';
import ToolBarLink from '../../../components/ui/ToolBarLink';
import { EmployeeMenuList } from '../datas';

const MyPage = () => {
  const navigation = useNavigate();
  const [papers, setPapers] = useState<EmploymentContractListGetResponse[]>([]);
  const [paperDetail, setPaperDetail] =
    useState<EmployeePaperGetResponse | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const [modalMsg, setModalMsg] = useState<string>('');

  const openModal = (msg?: string) => {
    setModalMsg(msg || '');
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const getContract = async (employmentContractId: number) => {
    try {
      const response =
        await ApiClient.getInstance().employeeGetContract(employmentContractId);

      console.log(response);

      setPaperDetail(response);
      if (response) {
        openModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMyInfo = async () => {
    try {
      const response: MyInfo =
        await ApiClient.getInstance().employeeGetMyInfo();

      setMyInfo(response);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const response: EmploymentContractListGetResponse[] =
        await ApiClient.getInstance().getPaperList();

      console.log(response);
      setPapers(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    getMyInfo();
  }, []);
  return (
    <>
      {isModalOpen && paperDetail && (
        <ModalBottom
          title='근로계약서'
          closeModal={closeModal}
          btnBottom
          btnText='확인'
          action={closeModal}
        >
          <div className='flex flex-col gap-3 mb-5 text-sm max-h-[450px] overflow-y-scroll'>
            <div className='flex justify-between w-full pt-5'>
              <div className='font-semibold text-start'>근무지</div>
              <div>
                <WorkPlaceName
                  name={paperDetail?.workPlaceName}
                  colorType='02'
                />
              </div>
            </div>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-start'>근무지 주소</div>
              <div>{paperDetail?.workSite}</div>
            </div>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-start'>근무 내용</div>
              <div>{paperDetail?.workDetail}</div>
            </div>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-start'>근무 시작일</div>
              <div>
                {paperDetail.workStartDate
                  .toString()
                  .substring(
                    0,
                    paperDetail.workStartDate.toString().indexOf('T')
                  )}
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='font-semibold text-start'>나의 주소</div>
              <div>{paperDetail?.employeeAddress}</div>
            </div>
            <div className='flex justify-between gap-10'>
              <div className='font-semibold text-start'>나의 연락처</div>
              <div>{paperDetail?.employeePhone}</div>
            </div>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-start'>휴무일</div>
              <div>{paperDetail?.restDayOfWeek}</div>
            </div>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-start'>시급</div>
              <div>{paperDetail?.payPerHour.toLocaleString()}원</div>
            </div>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-start'>급여일</div>
              <div>{paperDetail?.paymentDay}일</div>
            </div>

            <div className='flex  justify-between w-full'>
              <div className='font-semibold text-start mb-2'>근무일</div>
              <div className='flex flex-col gap-3 justify-between'>
                {paperDetail?.workTimes?.map((item) => {
                  return (
                    <div
                      key={item.workDayOfWeek}
                      className='flex justify-between'
                    >
                      <div className='text-start pr-3'>
                        {item.workDayOfWeek}
                      </div>
                      <div className='flex flex-col'>
                        <div>
                          근무시간 {item.workStartTime} - {item.workEndTime}
                        </div>
                        <div>
                          휴게시간 {item.restStartTime} - {item.restEndTime}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ModalBottom>
      )}
      <Frame navTitle='알바ON'>
        <ToolBarLink options={EmployeeMenuList} />
        <div className='w-full flex flex-col gap-10 '>
          {/* 나의 정보 */}
          <Wrapper title='나의 정보' className='mt-7'>
            <WhiteBox className='px-3 py-7' border>
              <div className='flex flex-col gap-2 text-sm'>
                {/* 성명 */}
                <div className='flex justify-between'>
                  <div>성명</div>
                  <div className='text-gray-400'>{myInfo?.username}</div>
                </div>
                {/* 전화번호 */}
                <div className='flex justify-between'>
                  <div>전화번호</div>
                  <div className='text-gray-400'>{myInfo?.phoneNumber}</div>
                </div>
                {/* 계좌번호 */}
                <div className='flex justify-between'>
                  <div>계좌번호</div>
                  <div className='text-gray-400'>{myInfo?.accountNumber}</div>
                </div>
              </div>
            </WhiteBox>
            {/* 수정하기 버튼 */}
            <button
              className=' self-end text-gray-400 text-sm mt-2 pr-2 bg-transparent'
              onClick={() => navigation('/my/edit')}
            >
              수정하기
            </button>
          </Wrapper>

          {/* 근로계약서 */}
          <Wrapper title='근로계약서'>
            <div className='flex flex-col gap-2'>
              {papers?.map((item, index) => (
                <WhiteBox border key={item.employmentContractId}>
                  <button
                    type='button'
                    className='flex flex-col justify-center text-sm w-full h-full bg-transparent py-4'
                    onClick={() => getContract(item.employmentContractId)}
                  >
                    <div className='w-full flex justify-between items-center'>
                      <WorkPlaceName
                        name={item.workPlaceNm}
                        colorType={item.colorTypeCd}
                      />
                      <div>{item.employmentContractCreatedAt}</div>
                    </div>
                  </button>
                </WhiteBox>
              ))}
            </div>
          </Wrapper>
        </div>
      </Frame>
    </>
  );
};

export default MyPage;
