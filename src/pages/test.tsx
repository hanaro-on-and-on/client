import { useState } from 'react';
import Frame from '../components/Frame';
import ModalBottom from '../components/ModalBottom';
import BtnBottom from '../components/BtnBottom';

const Test = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const closeModal = () => {
    setModalOpen(false);
  };

  const func = () => {
    console.log('안녕하세요');
  };
  return (
    <>
      <Frame navTitle='알바ON'>
        {isModalOpen && (
          <ModalBottom
            title='TITLE'
            btnBottom
            btnText='btnText'
            closeModal={closeModal}
            action={() => console.log('test')}
          >
            <div>contents here</div>
          </ModalBottom>
        )}
        <div className='text-2xl font-bold text-hanaLightGreen'>test</div>
        <BtnBottom text='button test' action={func}></BtnBottom>
      </Frame>
    </>
  );
};

export default Test;
