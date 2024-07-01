import { useRef } from 'react';
import Frame from '../../../components/Frame';
import InputBorder from '../../../components/InputBorder';

const ManualWorkPlaceAddition = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hourlyRate = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2'>
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
      </Frame>
    </>
  );
};

export default ManualWorkPlaceAddition;
