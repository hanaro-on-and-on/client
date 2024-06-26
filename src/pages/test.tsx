import { useState } from 'react';
import BtnBottom from '../components/BtnBottom';
import Frame from '../components/Frame';
import ModalBottom from '../components/ModalBottom';

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
            title='뒤지겠니?'
            btnBottom
            btnText='아이스티'
            closeModal={closeModal}
            action={[
              () => {
                console.log('아이스티 미지근');
              },
            ]}
          >
            <div>뒤지겠다</div>
          </ModalBottom>
        )}
        <div className='text-2xl font-bold text-hanaLightGreen'>test</div>
        <BtnBottom text='버튼' action={[func]}></BtnBottom>
      </Frame>
    </>
  );
};

export default Test;
