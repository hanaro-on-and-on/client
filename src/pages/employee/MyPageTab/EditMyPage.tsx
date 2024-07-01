import { useNavigate } from 'react-router-dom';
import BtnBottom from '../../../components/BtnBottom';
import Frame from '../../../components/Frame';
import InputBox from '../../../components/ui/InputBox';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import ModalBottom from '../../../components/ModalBottom';
import { useState } from 'react';

const EditMyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2 h-full justify-between my-5'>
          <div className='flex flex-col justify-start gap-2'>
            <ReturnArrow To='/my' text='뒤로가기' />
            <InputBox label='은행'></InputBox>
            <InputBox label='계좌'></InputBox>
          </div>

          <BtnBottom text='수정하기' action={openModal} />
        </div>
        {isModalOpen && (
          <ModalBottom btnBottom btnText='수정' closeModal={closeModal}>
            <div>안녕하세요</div>
          </ModalBottom>
        )}
      </Frame>
    </>
  );
};

export default EditMyPage;
