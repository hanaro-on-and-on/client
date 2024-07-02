import { useNavigate } from 'react-router-dom';
import BtnBottom from '../../../components/BtnBottom';
import Frame from '../../../components/Frame';
import InputBox from '../../../components/ui/InputBox';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import ModalBottom from '../../../components/ModalBottom';
import { useRef, useState } from 'react';
import InputBorderSelect from '../../../components/InputBorderSelect';
import { BankList } from '../../LandingPage/EmployeeAddMainAccount';
import InputBorder from '../../../components/InputBorder';
import ApiClient from '../../../api/apiClient';
import ModalCenter from '../../../components/ModalCenter';

const EditMyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCenterOpen, setIsModalCenterOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState<string>('');

  const bankRef = useRef<HTMLSelectElement | null>(null);
  const accountRef = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate();

  const openModal = (msg?: string) => {
    setModalMsg(msg || '');
    setIsModalOpen(true);
  };

  const openModalCenter = (msg?: string) => {
    setModalMsg(msg || '');
    setIsModalCenterOpen(true);
  };

  const closeModalCenter = () => {
    setIsModalCenterOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validation = () => {
    const accountNumber = accountRef.current?.value;
    if (!accountNumber) return false;
    return true;
  };

  const updateAccount = async () => {
    if (!validation) return;

    const dat: EmployeeAccountUpdate = {
      accountNumber: accountRef.current!.value!,
    };

    try {
      const response = await ApiClient.getInstance().employeeUpdateAccount(dat);
      console.log(response);
      openModalCenter('등록 성공');
    } catch (err) {
      console.error(err);
    }
  };

  const confirmAction = () => {
    closeModal();
    updateAccount();
  };

  return (
    <>
      {isModalCenterOpen && (
        <ModalCenter
          title='계좌 등록'
          confirmAction={() => navigation('/my')}
          closeModal={closeModalCenter}
        >
          <div>{modalMsg}</div>
        </ModalCenter>
      )}
      {isModalOpen && (
        <ModalBottom
          btnBottom
          btnText='수정'
          title='계좌 확인'
          closeModal={closeModal}
          action={confirmAction}
        >
          <div className='flex flex-col py-10'>
            <div className='flex justify-between'>
              {/* 은행명 */}
              <div className='text-start font-semibold'>
                {BankList[bankRef.current?.selectedIndex || 0].text}
              </div>
              {/* 계좌번호 */}
              <div className='text-end'>{accountRef.current?.value}</div>
            </div>
            <div className='py-5'>위 계좌를 등록 하시겠습니까?</div>
          </div>
        </ModalBottom>
      )}
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2 h-full justify-between my-5'>
          <div className='flex flex-col justify-start gap-2'>
            <ReturnArrow To='/my' text='뒤로가기' />
            <InputBorderSelect
              ref={bankRef}
              selectionList={BankList}
              title='은행'
              defaultValue={BankList[0]}
            />
            <InputBorder
              ref={accountRef}
              title='계좌번호'
              placeHolder='-를 제외하고 입력해주세요'
            />
          </div>

          <BtnBottom text='수정하기' action={openModal} />
        </div>
      </Frame>
    </>
  );
};

export default EditMyPage;
