import { useEffect, useRef } from 'react';
import Frame from '../../../components/Frame';
import InputBorder from '../../../components/InputBorder';
import ReturnArrow from '../../../components/ui/ReturnArrow';
import BtnBottom from '../../../components/BtnBottom';
import { useNavigate } from 'react-router-dom';

const ManualWorkPlaceAddition = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hourlyRate = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.click();
  }, []);

  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2 pt-2 pb-5 h-full justify-between'>
          <div className='flex flex-col gap-3'>
            <ReturnArrow text='근무지 목록' To='/part-time/worktime' />
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
            action={() => navigation('/part-time/worktime/manual/addition')}
          />
        </div>
      </Frame>
    </>
  );
};

export default ManualWorkPlaceAddition;
