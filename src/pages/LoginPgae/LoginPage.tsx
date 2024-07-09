import { useRef, useState } from 'react';
import Frame from '../../components/Frame';
import BtnBottom from '../../components/BtnBottom';
import login, { LoginReturnType, ROLE } from '../../components/login';
import ModalCenter from '../../components/ModalCenter';
import { useNavigate } from 'react-router-dom';
import DetailWorkInfo from '../../components/employee/DetailWorkInfo';

const LoginPage = () => {
  const [pwErr, pwIdErr] = useState<string>('');
  const pwRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const navigation = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = (msg: string) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  const onLogin = async () => {
    const pw = pwRef.current?.value;

    try {
      const { role, isSuccess }: LoginReturnType = await login(
        pw || '',
        openModal
      );

      if (isSuccess) {
        if (role === ROLE.EMPLOYEE) navigation('/my');
        else if (role === ROLE.OWNER) navigation('/owner/MyWorkSpaces');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalCenter
          confirmText='확인'
          confirmAction={closeModal}
          closeModal={closeModal}
        >
          <div>{modalMsg}</div>
        </ModalCenter>
      )}
      <Frame navTitle='로그인'>
        <div className='w-full h-full flex flex-col gap-10 pt-10 justify-between'>
          <div className='flex flex-col gap-3 '>
            <div className='text-2xl font-bold mb-3'>Log-in</div>
            <div className='text-gray-300 text-sm mb-10'>
              간편 비밀번호를 입력해주세요
            </div>
            <div>
              <input
                placeholder='비밀번호'
                ref={pwRef}
                type='password'
                className='py-2 px-1 border-b-2 border-b-hanaLightGreen w-[80%] focus:outline-none'
              />
              <span className='text-red-500 text-sm'>{pwErr}</span>
            </div>
          </div>

          <BtnBottom text='로그인' action={onLogin} />
        </div>
      </Frame>
    </>
  );
};

export default LoginPage;
