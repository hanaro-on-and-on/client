import { useNavigate } from 'react-router-dom';
import BtnBottom from '../../components/BtnBottom';
import Frame from '../../components/Frame';
import WhiteBox from '../../components/ui/WhiteBox';
import Wrapper from '../../components/Wrapper';
import { useState } from 'react';
import ModalBottom from '../../components/ModalBottom';

const EmployeeAddMainAccount = () => {
  const [isModalOpen, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  const openModal = () => {
    setIsModal(true);
  };

  const navigation = useNavigate();
  return (
    <>
      <Frame>
        <div className='flex flex-col justify-between w-full h-full py-5 gap-2'>
          <Wrapper title='알바생 대표 계좌 등록'>
            <div className=' flex flex-col justify-start gap-2'>
              <WhiteBox border className='py-2'>
                <div className='flex justify-between'>
                  <span className='font-bold'>이름</span>
                  <span>홍길동</span>
                </div>
              </WhiteBox>
              <WhiteBox border title='은행' className='min-h-[100px] py-5'>
                <div></div>
              </WhiteBox>
              <WhiteBox border title='계좌번호' className='min-h-[100px] py-5'>
                <div></div>
              </WhiteBox>
              <WhiteBox border className='py-1'>
                <div className='text-start text-sm'>개인정보 이용 동의</div>
              </WhiteBox>
            </div>
          </Wrapper>

          <BtnBottom text='설정하기' action={() => openModal()} />
        </div>
      </Frame>
      {isModalOpen && (
        <ModalBottom
          btnBottom
          btnText='동의하기'
          title='개인정보 제공 동의'
          closeModal={closeModal}
          action={() => navigation('/my')}
        >
          <div>개인정보 약관</div>
        </ModalBottom>
      )}
    </>
  );
};

export default EmployeeAddMainAccount;
