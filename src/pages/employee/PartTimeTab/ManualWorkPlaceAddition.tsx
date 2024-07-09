import { useEffect, useRef, useState } from 'react';
import Frame from '../../../components/Frame';
import InputBorder from '../../../components/InputBorder';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../../api/apiClient';
import ModalCenter from '../../../components/ModalCenter';
import { SELECTED_TAB } from './PaymentMain';
import BtnBottom from '../../../components/BtnBottom';

const ManualWorkPlaceAddition = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hourlyRate = useRef<HTMLInputElement | null>(null);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  const navigation = useNavigate();

  const openModal = (msg: string, title: string) => {
    setMessage(msg);
    setModalTitle(title);
    setModalOpen(true);
  };

  const onSubmit = async () => {
    const customWorkPlaceNm = inputRef.current?.value;
    const payPerHour = hourlyRate.current?.value;

    if (!customWorkPlaceNm || !payPerHour) {
      openModal('값을 전부 입력해주세요', '알림');

      return;
    }

    const dat: ManualWorkPlaceAdditionRequest = {
      customWorkPlaceNm,
      payPerHour,
    };

    try {
      const response =
        await ApiClient.getInstance().manualWorkPlaceAddition(dat);

      console.log(response);

      setDone(true);
      openModal('등록 성공', '알림');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.click();
  }, []);

  return (
    <>
      {isModalOpen && (
        <ModalCenter
          title={modalTitle}
          closeModal={() => setModalOpen(false)}
          confirmAction={
            done
              ? () =>
                  navigation('/part-time/payment', {
                    state: { passedSelectedTab: SELECTED_TAB.WORKTIME },
                  })
              : () => setModalOpen(false)
          }
        >
          <div>{message}</div>
        </ModalCenter>
      )}
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2 pt-2 pb-5 h-full justify-between'>
          <div className='flex flex-col gap-3'>
            <ReturnArrow text='근무지 목록' To='/part-time/payment' />
            <div className='font-bold text-xl text-start mb-5 px-1'>
              근무지 정보를<br></br>
              입력해주세요
            </div>
            <InputBorder
              title='근무지'
              placeHolder='근무지명을 입력해주세요'
              ref={inputRef}
            />
            <InputBorder
              title='시급'
              placeHolder='시급을 입력해주세요'
              max={1000}
              min={1}
              type='number'
              ref={hourlyRate}
              unit='원'
            />
          </div>

          <BtnBottom
            text='등록'
            action={() => {
              onSubmit();
            }}
          />
        </div>
      </Frame>
    </>
  );
};

export default ManualWorkPlaceAddition;
