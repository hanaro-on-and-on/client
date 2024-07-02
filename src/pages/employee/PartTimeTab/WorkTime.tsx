import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnBorder from '../../../components/BtnBorder';
import ModalBottom from '../../../components/ModalBottom';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../../api/apiClient';
import SignPad from '../../../components/SignPad';

const WorkTime = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigation = useNavigate();
  const [confirmList, setConfirmList] = useState<ConfirmWorks[]>([]);
  const [getsign, setGetsign] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('전자 서명');

  const [papers, setPapers] = useState<EmploymentContractListGetResponse[]>([]);

  const refHandler = useRef<SignPadHandler>(null);

  const saveSignage = () => {
    // const dataURL = refHandler.current?.canvasRef.current?.value();

    // const dataURL = canvasRef.current.toDataURL('image/png');
    // const decodedURL = dataURL.replace(/^data:image\/\w+;base64,/, '');
    // const buf = Buffer.from(decodedURL, 'base64');
    // const blob = new Blob([buf], { type: 'image/png' });
    // return new File([blob], `${name}.png`, { type: 'image/png' });
    return 'true';
  };

  const fetchPaperList = async () => {
    try {
      const response: EmploymentContractListGetResponse[] =
        await ApiClient.getInstance().getPaperList();

      setPapers(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getConfirmList = async () => {
    try {
      const response: ConfirmReqResponse =
        await ApiClient.getInstance().getConfirmReq();

      console.log(response);
      setConfirmList(response.workPlacesInvitaionsGetResponseList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConfirmList();
    fetchPaperList();
    console.log(papers);
  }, []);

  useEffect(() => {
    console.log(papers);
  }, [papers]);

  return (
    // 연동 요청
    <div className='w-full flex flex-col gap-10'>
      <Wrapper title='연동 요청'>
        {confirmList?.map((item) => {
          return (
            <WhiteBox className='py-3' border key={item.workPlaceName}>
              <div className='flex justify-between items-center'>
                <WorkPlaceName name='롯데리아' colorType={item.colorCodeType} />
                <BtnBorder
                  color='green'
                  text='서명 요청'
                  onClick={() => setModalOpen(true)}
                />
              </div>
            </WhiteBox>
          );
        })}
      </Wrapper>

      {/* 사장님과 연동 */}
      <Wrapper title='사장님과 연동' className='flex flex-col gap-1'>
        {papers?.map((item) => (
          <WhiteBox className='py-3' border key={item.employmentContractId}>
            <div className='flex justify-between items-center'>
              <WorkPlaceName
                name={item.workPlaceNm}
                colorType={item.colorTypeCd}
              />
              <BtnBorder color='gray' text='계약 완료' onClick={() => {}} />
            </div>
          </WhiteBox>
        ))}
      </Wrapper>

      {/* 내가 추가한 */}
      <Wrapper
        title='내가 추가한'
        button
        buttonText='수동 등록'
        onButtonClick={() => navigation('manual/addition')}
      >
        <WhiteBox className='py-3' border>
          <div className='flex justify-between items-center'>
            <WorkPlaceName name='롯데리아' colorType='02' />
            <BtnBorder color='green' text='서명 요청' onClick={() => {}} />
          </div>
        </WhiteBox>
      </Wrapper>

      {isModalOpen && (
        <ModalBottom
          title={modalTitle}
          btnBottom={!getsign}
          action={() => {
            setGetsign(true);
            setModalTitle('서명을 입력해주세요');
          }}
          closeModal={() => setModalOpen(false)}
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
                  saveSignage();
                }}
                ref={refHandler}
              />
            </div>
          )}
        </ModalBottom>
      )}
    </div>
  );
};

export default WorkTime;
