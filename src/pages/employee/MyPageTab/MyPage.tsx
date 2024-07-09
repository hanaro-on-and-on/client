import { useNavigate } from 'react-router-dom';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import { useEffect, useState } from 'react';
import ApiClient from '../../../api/apiClient';
import ToolBarLink from '../../../components/ui/ToolBarLink';
import { EmployeeMenuList } from '../datas';
import Contract from '../../../components/Contract';
import ModalCenter from '../../../components/ModalCenter';
import PulseAttendance from '../../../components/PulseAttendance';

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
        <ModalCenter
          closeModal={closeModal}
          confirmText='확인'
          confirmAction={closeModal}
          className='w-[90%] h-[70%]'
          title='근로 계약서'
        >
          <Contract contractId={paperDetail.employmentContractId} />
        </ModalCenter>
      )}
      <Frame navTitle='알바ON' toolBar>
        <div className='w-full flex flex-col gap-10 pb-10 '>
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
              {papers &&
                papers.map((item, index) => (
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
              {!papers && (
                <div className='flex flex-col gap-2'>
                  <PulseAttendance />
                  <PulseAttendance />
                  <PulseAttendance />
                </div>
              )}
            </div>
          </Wrapper>
        </div>
      </Frame>
    </>
  );
};

export default MyPage;
