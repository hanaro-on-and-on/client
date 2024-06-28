import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnBorder from '../../../components/BtnBorder';
import ModalBottom from '../../../components/ModalBottom';
import { useState } from 'react';

const WorkTime = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    // 연동 요청
    <div className='w-full flex flex-col gap-10'>
      <Wrapper title='연동 요청'>
        <WhiteBox className='py-3' border>
          <div className='flex justify-between items-center'>
            <WorkPlaceName name='롯데리아' colorType='02' />
            <BtnBorder
              color='green'
              text='서명 요청'
              onClick={() => setModalOpen(true)}
            />
          </div>
        </WhiteBox>
      </Wrapper>

      {/* 사장님과 연동 */}
      <Wrapper title='사장님과 연동'>
        <WhiteBox className='py-3' border>
          <div className='flex justify-between items-center'>
            <WorkPlaceName name='롯데리아' colorType='02' />
            <BtnBorder color='gray' text='계약 완료' onClick={() => {}} />
          </div>
        </WhiteBox>
      </Wrapper>

      {/* 내가 추가한 */}
      <Wrapper title='내가 추가한'>
        <WhiteBox className='py-3' border>
          <div className='flex justify-between items-center'>
            <WorkPlaceName name='롯데리아' colorType='02' />
            <BtnBorder color='green' text='서명 요청' onClick={() => {}} />
          </div>
        </WhiteBox>
      </Wrapper>

      {isModalOpen && (
        <ModalBottom
          title='전자 서명 하시겠어요?'
          btnBottom
          closeModal={() => setModalOpen(false)}
          btnText='서명하기'
        >
          <>전자서명 시작!</>
        </ModalBottom>
      )}
    </div>
  );
};

export default WorkTime;
