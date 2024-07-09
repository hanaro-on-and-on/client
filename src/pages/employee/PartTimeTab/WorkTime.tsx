import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnBorder from '../../../components/BtnBorder';
import ModalBottom from '../../../components/ModalBottom';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../../api/apiClient';
import SignPad from '../../../components/SignPad';
import useToggle from '../../../hooks/toggle';
import ModalCenter from '../../../components/ModalCenter';
import Contract from '../../../components/Contract';

const WorkTime = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCenterOpen, setModalCenterOpen] = useState(false);
  const navigation = useNavigate();
  const [getsign, setGetsign] = useState<boolean>(false);
  const [currSignContractId, setCurrSignContractId] = useState<
    number | undefined
  >(undefined);
  const [modalTitle, setModalTitle] = useState<string>('전자 서명');

  const [workPlaceList, setWorkPlaceList] = useState<EmployeeWorkPlaceList>([]);
  const { flag, toggle } = useToggle();

  const refHandler = useRef<SignPadHandler>(null);

  const saveSignage = async (id: number | null) => {
    if (!id) return;
    const dataURL = refHandler.current?.canvasRef.current?.isEmpty();

    // const dataURL = canvasRef.current.toDataURL('image/png');
    // const decodedURL = dataURL.replace(/^data:image\/\w+;base64,/, '');
    // const buf = Buffer.from(decodedURL, 'base64');
    // const blob = new Blob([buf], { type: 'image/png' });
    // return new File([blob], `${name}.png`, { type: 'image/png' });

    if (!dataURL) {
      const res = await updateSign(id);
      console.log('res', res);
      if (res) {
        toggle();
      }
    }
  };

  const updateSign = async (contractId: number | undefined) => {
    if (contractId === undefined) return;
    const dataURL = refHandler.current?.canvasRef.current?.isEmpty();
    if (dataURL) return;

    try {
      const response: { workPlaceEmployeeId: number } =
        await ApiClient.getInstance().employeeContractSign(contractId);

      if (response) return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getWorkPlaceList = async () => {
    try {
      const response: EmployeeWorkPlaceList =
        await ApiClient.getInstance().employeeGetWorkPlaceList();

      console.log(response);
      setWorkPlaceList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCustomWorkPlace = async (id: number) => {
    try {
      const response =
        await ApiClient.getInstance().employeeDeleteCustomWorkPlace(id);
      if (response.success) {
        getWorkPlaceList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWorkPlaceList();
  }, [flag]);

  return (
    <>
      {isModalCenterOpen && (
        <ModalCenter
          hasDecline
          declineAction={() => setModalCenterOpen(false)}
          confirmText='서명하기'
          title='근로계약서 조회'
          confirmAction={() => {
            setModalOpen(true);
          }}
          closeModal={() => setModalCenterOpen(false)}
          className='w-[90%] px-1'
        >
          {currSignContractId && (
            <div className='h-[45vh] overflow-y-scroll w-full'>
              <Contract contractId={currSignContractId} />
            </div>
          )}
        </ModalCenter>
      )}
      <div className='w-full flex flex-col gap-10'>
        <Wrapper title='연동 요청'>
          <div className='flex flex-col gap-1'>
            {workPlaceList &&
            workPlaceList.invitatedWorkPlaceList?.length > 0 ? (
              workPlaceList?.invitatedWorkPlaceList.map((item, index) => (
                <WhiteBox
                  className='py-3'
                  border
                  key={item.employmentContractId + String(index)}
                >
                  <div className='flex justify-between items-center'>
                    <WorkPlaceName
                      name={item.workPlaceName}
                      colorType={item.colorCodeType}
                    />
                    <BtnBorder
                      color='green'
                      text='서명 요청'
                      onClick={() => {
                        setCurrSignContractId(item.employmentContractId);
                        setModalCenterOpen(true);
                      }}
                    />
                  </div>
                </WhiteBox>
              ))
            ) : (
              <WhiteBox>
                <div className='flex h-[55px] items-center justify-center text-gray-500 text-sm'>
                  연동 요청이 없습니다
                </div>
              </WhiteBox>
            )}
          </div>
        </Wrapper>

        {/* 사장님과 연동 */}
        <Wrapper title='사장님과 연동' className='flex flex-col gap-1'>
          {workPlaceList && workPlaceList.connectedWorkPlaceList?.length > 0 ? (
            <div className='flex flex-col gap-1'>
              {workPlaceList.connectedWorkPlaceList.map((item, index) => (
                <WhiteBox
                  className='py-3'
                  border
                  key={item.employmentContractId + String(index)}
                >
                  <div className='flex justify-between items-center'>
                    <WorkPlaceName
                      name={item.workPlaceName}
                      colorType={item.colorCodeType}
                    />
                    <BtnBorder
                      color='gray'
                      text='계약 완료'
                      onClick={() => {}}
                    />
                  </div>
                </WhiteBox>
              ))}
            </div>
          ) : (
            <WhiteBox>
              <div className='flex h-[55px] items-center justify-center text-gray-500 text-sm'>
                등록된 매장이 없습니다
              </div>
            </WhiteBox>
          )}
        </Wrapper>

        {/* 내가 추가한 */}
        <Wrapper
          title='내가 추가한'
          button
          buttonText='수동 등록'
          onButtonClick={() => navigation('/manual/addition')}
        >
          {workPlaceList && workPlaceList?.customWorkPlaceList?.length > 0 ? (
            <div className='flex flex-col gap-1'>
              {workPlaceList.customWorkPlaceList?.map((item, index) => (
                <WhiteBox
                  key={item.customWorkPlaceId || index * 2}
                  className='py-3'
                  border
                >
                  <div className='flex justify-between items-center'>
                    <WorkPlaceName
                      name={item.workPlaceName}
                      colorType={item.colorCodeType}
                    />
                    <BtnBorder
                      color='green'
                      text='삭제'
                      onClick={() =>
                        deleteCustomWorkPlace(item.customWorkPlaceId)
                      }
                    />
                  </div>
                </WhiteBox>
              ))}
            </div>
          ) : (
            <WhiteBox>
              <div className='flex h-[55px] items-center justify-center text-gray-500 text-sm'>
                등록된 매장이 없습니다
              </div>
            </WhiteBox>
          )}
        </Wrapper>

        {isModalOpen && (
          <ModalBottom
            title={modalTitle}
            btnBottom={!getsign}
            action={() => {
              setGetsign(true);
              setModalTitle('서명을 입력해주세요');
            }}
            closeModal={() => {
              setModalOpen(false);
              setGetsign(false);
            }}
            btnText={getsign ? '' : '서명하기'}
          >
            {!getsign ? (
              <>전자서명 시작!</>
            ) : (
              <div>
                <SignPad
                  submit={() => {
                    setModalOpen(false);
                    setGetsign(false);
                    updateSign(currSignContractId);
                  }}
                  ref={refHandler}
                />
              </div>
            )}
          </ModalBottom>
        )}
      </div>
    </>
  );
};

export default WorkTime;
